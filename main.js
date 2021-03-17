const { app, BrowserWindow } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

let winV

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({ width: 1325, height: 725, frame: false, minWidth: 1325, minHeight: 725, icon: "assets/klein.ico", webPreferences: {nodeIntegration: true} })

  //Remove top menu
  //win.setMenu(null);

  // and load the index.html of the app.
  win.loadFile('index.html')

  // Open the DevTools.
  win.webContents.openDevTools()

  win.webContents.executeJavaScript('', /* userGesture */ true)

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

function checkVersion (){
  //Create the version checking browser window
  winV = new BrowserWindow({ width: 1425, height: 1285, frame: false, icon: "assets/klein.ico", resizable: false, webPreferences: {nodeIntegration: true} })

  //Remove top menu
  //win.setMenu(null);

  // and load the index.html of the app.
  winV.loadFile('checkVersion.html')

  // Open the DevTools.
  winV.webContents.openDevTools()

  // Emitted when the window is closed.
  winV.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    winV = null
  })
  winV.on('close', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    createWindow()
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', checkVersion)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
