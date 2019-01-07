import sketch from 'sketch';
import fs from '@skpm/fs';
import util from 'util';

export default function(context){
  const doc = sketch.fromNative(context.document);

  function popUp() {
    const options = ['All styles', 'Selected styles'];
    const selection = sketch.UI.getSelectionFromUser("What do you want to export?", options);
    const okClicked = selection[2];
    const layers = '';

    if (okClicked) {
      const target = options[selection[1]];
      layers = setTargetLayers(target);
      if (layers.length) {
        createFile(layers);
      } else {
        sketch.UI.message('No layers selected');
      }
    }

  }

  function setTargetLayers(target) {
    let layers = [];
    if (target == 'All styles') {
      layers = doc.getSharedLayerStyles();
    } else {
      let selection = doc.selectedLayers;
      selection.forEach((layer) => {
        layers.push(layer);
      });
    }
    return layers
  }

  function createFile(layers) {
    let colorStyles = {};
    Object.values(layers).forEach(($layer) => {
      const name = getLastPart($layer.name);
      const hex = $layer.style.fills[0].color;
      const cleanHex = hex.substr(0, 7);
      colorStyles[name] = cleanHex;
    });

    saveFile(colorStyles);
  }

  function getLastPart(name){
    // Check if the name contains a path info, if so, remove it
    if (name.indexOf('/') !== -1 ) {
      name = name.substr(name.lastIndexOf('/') + 1);
    }
    return name.toLowerCase();
  }

  function saveFile(styles) {
    const save = NSSavePanel.savePanel();
    save.setNameFieldStringValue("colors.js");
    save.setAllowedFileTypes(["js"]);
    save.setAllowsOtherFileTypes(false);
    save.setExtensionHidden(true);

    if (save.runModal()) {
      const path = save.URL().path();
      fs.writeFileSync(path, `let colors = ${util.inspect(styles, { depth: null })}`, 'utf8');
      sketch.UI.message("Colors exported");
    }
  }

  // Initialize
  popUp();
};
