# Sketch Tailwind

Note: This plugin will not be updated. I don't own a Sketch licence anymore and plugin development for Sketch is a bit of a pain tbh. Have made a Figma version of this plugin, you can find it over [here](https://www.figma.com/c/plugin/785619431629077634/Figma-Tailwindcss). That version is still being maintained and input for new features is welcome in the [repo](https://github.com/jan-dh/figma-tailwindcss/).

A plugin that tries to bridge the gap between design and code. Sketch Tailwind lets you export aspects of a design made in Sketch to a javascript `theme` file that can easily be used with Tailwind CSS.

---

## Table of Contents

-   [Installation](#installation)
-   [Usage](#usage)
-   [Roadmap](#roadmap)
-   [License](#license)

## Installation

Download the ZIP-folder. After extracting, double-click the `💎sketch-tailwind-plugin.sketchplugin` file.

## Usage

### Creating your theme

The plugin gets it's info from the Layer Styles and Text Styles. At this point it picks up:

-   colors
-   font-families
-   text-sizes

### Colors

For the colors the plugin will look at all your Layer Styles and takes each color, using the last part of it's name (behind the last /). This way you can still organize your colors in Sketch using subfolders, while only exporting the actual color name. Within the plugin you can add some extra colors if you need to. Might add a color-picker if people would like to see that.

### Font-families

The plugin will pick up all font-families used in your Text Layers.

### Text-sizes

All the different font-sizes you use in your Text Styles will be picked up by the plugin. You can pick a base font-size and the rest of the font-size names are calculated accordingly. The logic used:

```javascript
...
'3xs'
'2xs'
'xs'
'sm'
'base'
'lg'
'xl'
'2xl'
'3xl'
...
```

The font-sizes the plugin spits out will also be converted into a rem based scale (with 16 as your base).

### Importing your theme

When you export the theme it saves a file with your theme in a variable `theme` and there's an export available in the file.
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

-   🎨 Provide color scale support
-   🚀 Add more possible exports

## License

This project is licensed under the terms of the MIT license.
