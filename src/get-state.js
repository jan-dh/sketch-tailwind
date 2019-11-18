import sketch from "sketch";
import { getLastPart } from "./helpers";
import fs from "@skpm/fs";
import util from "util";

export default function() {
  const doc = sketch.fromNative(context.document);
  const layers = doc.sharedLayerStyles;
  const textLayers = doc.sharedTextStyles;
  const state = {};

  // Get colors
  function getColors(layers) {
    let colors = [];
    Object.values(layers).forEach(($layer, i) => {
      // Check if color is defined
      const testForColor =
        $layer &&
        $layer.style &&
        $layer.style.fills[0] &&
        $layer.style.fills[0].color;
      if ($layer.constructor.name != "Function" && testForColor !== undefined) {
        const color = {};
        // Name
        color.name = getLastPart($layer.name);
        // Clean hex
        const hex = $layer.style.fills[0].color;
        color.hex = hex.substr(0, 7);
        // Add color
        colors.push(color);
        console.log(colors);
      }
    });
    return colors;
  }
  // Get font family
  function getFontFamilies(layers) {
    const names = layers.map($layer =>
      $layer.style.sketchObject
        .textStyle()
        .attributes()
        .NSFont.familyName()
    );
    const fontFamilies = names.map(name => ({
      name: String(name),
      value: String(name)
        .replace(/\s+/g, "-")
        .toLowerCase()
    }));
    // Remove duplicates
    const cleanFamilies = fontFamilies
      .map(e => e["name"])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter(e => fontFamilies[e])
      .map(e => fontFamilies[e]);
    return cleanFamilies;
  }
  // Get Font sizes
  function getFontSizes(layers) {
    let fontSizes = {};
    const sizes = layers.map($layer =>
      $layer.style.sketchObject
        .textStyle()
        .attributes()
        .NSFont.pointSize()
    );
    Object.values(sizes).forEach($size => {
      // Set empty text for each size
      fontSizes[$size] = "";
    });
    return fontSizes;
  }

  // Set state
  if (layers.length > 0) {
    state.colors = getColors(layers);
    state.fontSizes = getFontSizes(textLayers);
    state.fontFamilies = getFontFamilies(textLayers);
    return state;
  } else {
    sketch.UI.message("No layers found");
  }
}
