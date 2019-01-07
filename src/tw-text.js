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
    let textStyles = {};
    textStyles['fonts'] = createFontFamilies(layers);
    textStyles['textSizes'] = createFontSizes(layers);
    saveFile(textStyles);
  }

  function createFontFamilies(layers){
    let familyObject = {};

    const families = selection.map($style => $style.style.sketchObject.textStyle().attributes().NSFont.familyName());
    Object.values(families).forEach(($family) => {
      familyObject[$family.replace(' ','-').toLowerCase()] = $family;
    });

    return familyObject;
  }

  function createFontSizes(layers){
    let fontSizesObject = {}

    // Get base font-size
    let baseItem = selection.filter($item => getFirstPart($item.name) == 'base');
    const baseFontSize = baseItem[0].style.sketchObject.textStyle().attributes().NSFont.pointSize();

    // Group smaller and items, map values only
    let smallerSizes = selection.map($item => $item.style.sketchObject.textStyle().attributes().NSFont.pointSize())
                                  .filter($item => $item < baseFontSize)
    let biggerSizes = selection.map($item => $item.style.sketchObject.textStyle().attributes().NSFont.pointSize())
                                  .filter($item => $item > baseFontSize)

    // Remove duplicates and sort
    smallerSizes = [...new Set(smallerSizes)].sort();
    biggerSizes = [...new Set(biggerSizes)].sort();

    // Push smaller sizes
    Object.values(smallerSizes).forEach(($size, index, array) => {
      if (index == array.length - 1 ) {
        fontSizesObject['sm'] = `${$size/16}rem`;
      } else if (index == array.length - 2 ){
        fontSizesObject['xs'] = `${$size/16}rem`;
      } else{
        fontSizesObject[`${'x'.repeat(array.length - 1)}s`] = `${$size/16}rem`;
      }
    })
    // Push base
    fontSizesObject['base'] = `${baseFontSize/16}rem`;
    // Push bigger sizes
    Object.values(biggerSizes).forEach(($size, index, array) => {
      if (index == 0 ) {
        fontSizesObject['lg'] = `${$size/16}rem`;
      } else if (index == 1 ){
        fontSizesObject['xl'] = `${$size/16}rem`;
      } else{
        fontSizesObject[`${'x'.repeat(index)}xl`] = `${$size/16}rem`;
      }
    })
    return fontSizesObject;
  }

  function getFirstPart(name){
    // Check if the name contains a path info, if so, remove it
    if (name.indexOf('/') !== -1 ) {
      name = name.substr(0, name.indexOf('/'));
    }
    return name.toLowerCase();
  }

  function saveFile(styles) {
    const save = NSSavePanel.savePanel();
    save.setNameFieldStringValue("text.js");
    save.setAllowedFileTypes(["js"]);
    save.setAllowsOtherFileTypes(false);
    save.setExtensionHidden(true);

    if (save.runModal()) {
      const path = save.URL().path();
      fs.writeFileSync(path, util.inspect(styles,{ depth: null }), 'utf8');
      sketch.UI.message("Text exported");
    }
  }

  // Initialize
  popUp();
};
