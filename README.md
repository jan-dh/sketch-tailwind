# Sketch Tailwind

A plugin that tries to bridge the gap between design and code. Sketch Tailwind lets you export aspects of a design made in Sketch to a javascript `theme` file that can be easily used with Tailwind CSS.

--- 

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [License](#license)

## Installation

Download the ZIP-folder. After extracting, double-click the `💎sketch-tailwind-plugin.sketchplugin` file. 

## Usage

### Creating your theme
The plugin gets it's info from the Layer Styles and Text Styles. At this point it picks up:
- colors
- font-families
- text-sizes. 

When you export the theme it saves a file with your theme in a variable `theme` and there's an export available in the file.

### Importing your theme
Import the `theme.js` file in to your `tailwind.js` configuration file. 
```
import theme from './theme';
```
Using the spread operator at the end of each property you can add the colors, fonts and font-sizes to your config.
```
let colors = {
  'transparent': 'transparent',
  ...
  ...theme.colors,
```

## Contributing
All feedback is welcome. Feel free to submit [issues or suggestions](https://github.com/jan-dh/sketch-tailwind/issues).  

## Roadmap
- 🔥 Add Plugin Icon 
- 🚀 Add more possible exports

## License
This project is licensed under the terms of the MIT license.
