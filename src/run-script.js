import BrowserWindow from 'sketch-module-web-view'
import sketch from 'sketch';
import fs from '@skpm/fs';
import util from 'util';

export default function() {

  const doc = sketch.fromNative(context.document);
  const options = {
    identifier: 'unique.id',
    width: 680,
    height: 700,
    show: false,
    resizable: false,
    minWidth: 650,
    minHeight: 500,
    minimizable: false,
    maximizable: false,
    title: 'Sketch Tailwind',
    resizable: true,
    show: false,
    webPreferences:{
     devTools:true
    }
  }

  const browserWindow = new BrowserWindow(options)
  const webContents = browserWindow.webContents

  // only show the window when the page has loaded
  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
  })


  // Pass the state to the window
  webContents.on('did-finish-load', () => {
    const state = {
      colors:[{name:'red-dark', hex:'#9B0316' }, { name:'red', hex:'#D0021B', }, { name:'pink', hex:'#FF61D9' }, { name:'orange', hex:'#ff8600' }],
      fontFamilies:{'Pro Sans pipi kaka':'pro-sans', 'Addelle':'addelle' },
      fontSizes:{6:'', 8:'', 10:'', 12:'', 14:'', 16:'', 20:'', 22:'', 24:'', 26:'', 28:''},
    }
    webContents
      .executeJavaScript(
       `setInitialState(${JSON.stringify(state)})`
      )
      .then(res => {
       sketch.UI.message('State set');
      })
  })

  // Remove instance on close
  webContents.on('closed', () => {
   webContents = null;
  })

  browserWindow.loadURL(require('../resources/webview.html'))
}
