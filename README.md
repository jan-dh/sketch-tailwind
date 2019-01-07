# Sketch Tailwind

A plugin that tries to bridge the gap between designs and code. Sketch Tailwind lets you export aspects of a design made in Sketch to javascript files that are ready to use with Tailwind CSS.

--- 

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

Install the dependencies

```
npm i
```

## Usage

Sketch Tailwind has a couple of different tasks that each export an aspect of a Sketch document (colors, fonts, ... ) to a javascript file that is compatible with a Tailwind CSS config. Some files can be directly imported (e.g. `colors.js`), other require a bit of copy/pasting. 

For naming conventions it's handy (though not necessary) that you name your Sketch Layer Styles and your Text Styles similarly with the `tailwind.js` config file.

### Tailwind colors

Exports all the colors from Layer Styles, either from selected layers or all the documents layers. For naming convention it looks at the last-part of your Layer Style name.

```
red
homepage/red-dark
```
will be exported as `colors.js` (default)

```
let colors = {
    'red':'#cc1f1a',
    'red-dark':'#cc1f1a'
}
```

### Tailwind colors

Exports the font-families and font-weights from Text Styles. 

### Text Sizes
In order to get the correct text-size, the plugin will look for a Text Style that begins with the name `base/`. It will then add the remaining sizes as such

```
xxs
xs
sm
base - provided by naming convention
lg
xl
2xl
3xl
...
```

## Roadmap
- Test current setup
- Add Plugin Icon and 🚀
- Add more possible exports, maybe create a styleguide template in Sketch with correct naming conventions in place.

## License

This project is licensed under the terms of the MIT license.
