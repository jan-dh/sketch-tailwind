import BrowserWindow from 'sketch-module-web-view'
import sketch from 'sketch';
import fs from '@skpm/fs';
import util from 'util';
import getState from './get-state';

export default function() {

  // Create the webview
  const options = {
    identifier: 'unique.id',
    width: 680,
    height: 700,
    show: false,
    resizable: true,
    minWidth: 650,
    minHeight: 500,
    minimizable: false,
    maximizable: false,
    title: 'Sketch Tailwind',
    resizable: true,
    show: false,
  }
  const browserWindow = new BrowserWindow(options)
  const state = getState();

  // pass in data to the BrowserWindow
  browserWindow.webContents.insertJS(
    `window.initialState = ${JSON.stringify(state)}`
  )
  // only show the window when the page has loaded
  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
  })
  // Remove instance on close
  browserWindow.on('closed', () => {
    browserWindow.webContents = null;
  })
  // Save the file
  browserWindow.webContents.on('exportFile', function(file) {
    saveFile(file);
  })
  // File save function
  function saveFile(theme) {
    const save = NSSavePanel.savePanel();
    save.setNameFieldStringValue("theme.js");
    save.setAllowedFileTypes(["js"]);
    save.setAllowsOtherFileTypes(false);
    save.setExtensionHidden(true);

    if (save.runModal()) {
      const path = save.URL().path();
      fs.writeFileSync(path, `const theme = ${util.inspect(theme, { depth: null })}; export default theme;`, 'utf8');
      sketch.UI.message("Theme exported");
    }
  }
  browserWindow.loadURL(require('../resources/webview.html'))
}
