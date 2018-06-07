# macos-accessibility-keyboard

------

<p align="center">
  <b>The missing interface for Apples' new native virtual keyboard.<br/>
  Enter the macOS on-screen Accessibility Keyboard.
</p>

------


## Contents

1. [Installation](#installation)
1. [API](#api)
1. [Examples](#examples)
1. [Platforms](#platforms)
1. [Contribututions](#contribututions)
1. [Author](#author)


## <a name="installation"></a>Usage

### Installation

```shell
$ npm install macos-accessibility-keyboard --save
```

### CommonJS Require

```javascript
const keyboard = require('macos-accessibility-keyboard')
```

### ES6 Module Import

```javascript
import keyboard from 'macos-accessibility-keyboard'
```


## <a name="api"></a>API

This module exposes the following methods:

#### `isEnabled()`

 - Returns: `Promise<Boolean>`
 - Check whether the accessibility on-screen keyboard is enabled

#### `isEnabledSync()`

 - Returns: `Boolean`
 - Check whether the accessibility on-screen keyboard is enabled, synchronously

#### `enable()`

 - Returns: `Promise`
 - Enables the keyboard

#### `disable()`

 - Returns: `Promise`
 - Disables the keyboard

#### `toggle()`

 - Returns: `Promise`
 - Toggles the keyboard


## <a name="usage"></a>Examples

### Show
```javascript
const {enable, disable} = require('macos-accessibility-keyboard');

enable().then(() => {
	console.log('The keyboard was enabled.')
	disable().then(() => {
		console.log('The keyboard was disabled.')
	})
})
```

```javascript
>>> The keyboard was enabled.
```

### Check

```javascript
const keyboard = require('macos-accessibility-keyboard');

const isEnabled = keyboard.isEnabledSync()
console.log('The keyboard is:', isEnabled ? 'on': 'off')
```

```javascript
>>>  The keyboard is: off
```


## <a name="platforms"/></a> Platforms

Tested on macOS High Sierra 10.13.4.


## <a name="contributions"/></a> Contribututions ![Contribute](https://img.shields.io/badge/contributions-wanted-red.svg?style=flat-square)

Read the [contribution documentation](https://github.com/sidneys/git-status-cli/blob/release/CONTRIBUTING.md) first.

- [Dev Chat](http://gitter.im/sidneys/git-status-cli): Talk about features and suggestions.
- [Issues](http;//github.com/sidneys/git-status-cli/issues) File bugs and document issues.


## <a name="author"/></a> Author

[sidneys](http://sidneys.github.io) 2018

