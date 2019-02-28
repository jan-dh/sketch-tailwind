import sketch from 'sketch';
import {getLastPart} from './helpers';
import fs from '@skpm/fs';
import util from 'util';


export default function() {
  const doc = sketch.fromNative(context.document);
  const layers = doc.getSharedLayerStyles();
  const textLayers = doc.getSharedTextStyles();
  const state = {};

  // Get colors
  function getColors(layers) {
    let colors = [];
    Object.values(layers).forEach(($layer, i) => {
      const color = {};
      // Name
      color.name = getLastPart($layer.name);
      const hex = $layer.style.fills[0].color;
      // Clean hex
      color.hex = hex.substr(0, 7);
      // Add color
      colors[i] = color;
    });
    return colors;
  }
  // Get font family
  function getFontFamilies(layers) {
    const names = layers.map($layer => $layer.style.sketchObject.textStyle().attributes().NSFont.familyName());
    const fontFamilies = names.map((name) => (
        {
          name: String(name),
          value: String(name).replace(/\s+/g, '-').toLowerCase()
        }
      )
    );
    // Remove duplicates
    const cleanFamilies = fontFamilies.map(e => e['name'])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter(e => fontFamilies[e]).map(e => fontFamilies[e]);
    return cleanFamilies;
  }
  // Get Font sizes
  function getFontSizes(layers) {
    let fontSizes = {}
    const sizes = layers.map($layer => $layer.style.sketchObject.textStyle().attributes().NSFont.pointSize());
    Object.values(sizes).forEach(($size) => {
      // Set empty text for each size
      fontSizes[$size] = '';
    });
    return fontSizes;
  }


  // Set state
  state.colors = getColors(layers);
  state.fontSizes = getFontSizes(textLayers);
  state.fontFamilies = getFontFamilies(textLayers);

  // Save File for testing
  // function saveFile(theme) {
  //   const save = NSSavePanel.savePanel();
  //   save.setNameFieldStringValue("theme.js");
  //   save.setAllowedFileTypes(["js"]);
  //   save.setAllowsOtherFileTypes(false);
  //   save.setExtensionHidden(true);
  //
  //   if (save.runModal()) {
  //     const path = save.URL().path();
  //     fs.writeFileSync(path, `const theme = ${util.inspect(theme, { depth: null })}`, 'utf8');
  //     sketch.UI.message("Theme exported");
  //   }
  // }
  // saveFile(state);

  return state;
}
