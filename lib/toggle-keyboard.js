'use strict'


/**
 * Modules
 * External
 * @constant
 */
const logger = require('@sidneys/logger')({ write: true })
const osa = require('osa2')

/**
 * Toggle Keyboard
 * @return {Boolean} A promise to the state.
 */
let toggleKeyboard = () => {
    logger.debug('toggleKeyboard')

    return osa(() => {
        /* eslint-disable no-undef */
        // Persist start-up state of the "System Preferences" app
        var isRunningSystemPreferences = Application('System Preferences').running()

        // Initialize storage for the checkbox value
        var initialCheckboxValue
        var currentCheckboxValue

        // Show "Keyboard" pane within the Accessibility preferences
        Application('System Preferences').panes.byId('com.apple.preference.universalaccess').anchors[1].reveal()

        // Start automated interaction
        var appSE = Application('System Events')

        // Wait for: System Preferences Window
        while (appSE.processes.byName('System Preferences').windows[0].tabGroups.length !== 1) {}

        // Wait for: Settings Pane
        while (appSE.processes.byName('System Preferences').windows[0].tabGroups[0].radioButtons[1].name() !== 'Accessibility Keyboard') {}

        // Select the "Accessibility Keyboard" Segmented Control
        appSE.processes.byName('System Preferences').windows[0].tabGroups[0].radioButtons[1].click()

        // Tick the "Enable Accessibility Keyboard" checkbox, remembering its before/after value
        initialCheckboxValue = appSE.processes.byName('System Preferences').windows[0].tabGroups[0].checkboxes[0].value()
        appSE.processes.byName('System Preferences').windows[0].tabGroups[0].checkboxes[0].click()
        currentCheckboxValue = appSE.processes.byName('System Preferences').windows[0].tabGroups[0].checkboxes[0].value()

        // Did the checkbox value change?
        if (initialCheckboxValue === currentCheckboxValue) {
            // No – Wait for: confirmation dialog
            while (appSE.processes.byName('System Preferences').windows[0].sheets.length === 0) {}

            // Dismiss dialog
            appSE.processes.byName('System Preferences').windows[0].sheets[0].buttons[0].click()
        }

        // Did the "System Preferences" app run on start-up?
        // Restore initial state of the "System Preferences" application
        if (!isRunningSystemPreferences) {
            // No – Quit
            Application('System Preferences').quit()
        } else {
            // Yes – Return to the overview screen
            appSE.processes.byName('System Preferences').menuBars[0].menuBarItems[3].menus[0].menuItems[2].click()
        }
        /* eslint-enable */
    })()
}


/**
 * @exports
 */
module.exports = toggleKeyboard
