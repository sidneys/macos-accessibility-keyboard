'use strict'


/**
 * Modules
 * Node
 * @constant
 */
const path = require('path')

/**
 * Modules
 * External
 * @constant
 */
const appRootPath = require('app-root-path')
appRootPath.setPath(path.join(__dirname, '..'))
global.requireLibrary = appRootPath.require
const logger = require('@sidneys/logger')({ write: true })
const execa = require('execa')

/**
 * Modules
 * Internal
 * @constant
 */
const toggleKeyboard = requireLibrary('./lib/toggle-keyboard')


/**
 * Check whether the accessibility on-screen keyboard is enabled.
 * @return {Promise<Boolean>} A promise to the keyboards' state.
 */
let isEnabled = () => {
    logger.debug('isEnabled')

    return new Promise((resolve) => {
        execa('defaults', ['read', 'com.apple.universalaccess', 'virtualKeyboardOnOff']).then((status) => {
            resolve(Boolean(Number(status.stdout)))
        })
    })
}

/**
 * Check whether the accessibility on-screen keyboard is enabled, synchronously.
 * @return {Boolean} The keyboards' state.
 */
let isEnabledSync = () => {
    logger.debug('isEnabledSync')

    const status = execa.sync('defaults', ['read', 'com.apple.universalaccess', 'virtualKeyboardOnOff'])

    return Boolean(Number(status.stdout))
}


/**
 * Enable Keyboard
 * @return {Promise} A promise.
 */
let enableKeyboard = () => {
    logger.debug('enableKeyboard')

    return isEnabled().then((isEnabled) => {
        if (!isEnabled) {
            toggleKeyboard()
        }
    })
}

/**
 * Disable Keyboard
 * @return {Promise} A promise.
 */
let disableKeyboard = () => {
    logger.debug('disableKeyboard')

    return isEnabled().then((isEnabled) => {
        if (isEnabled) {
            toggleKeyboard()
        }
    })
}


/**
 * @exports
 */
module.exports = {
    isEnabled: isEnabled,
    isEnabledSync: isEnabledSync,
    enable: enableKeyboard,
    disable: disableKeyboard,
    toggle: toggleKeyboard
}


