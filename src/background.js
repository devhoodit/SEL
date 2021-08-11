'use strict'

import { app, protocol, BrowserWindow, ipcMain, Tray, Menu} from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import fs from 'fs'
import { sqlite3 } from 'sqlite3'



const isDevelopment = process.env.NODE_ENV !== 'production'
const path = require('path')

let mainwin
let checkwin
let tray
let first_execute

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow (devPath, prodPath, width, height) {
  // Create the browser window.
  let window = new BrowserWindow({
    width: width,
    height: height,
    frame: true,
    titleBarStyle: 'hidden',
    show: false,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })
  const open_dev_tool = true
  
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await window.loadURL(process.env.WEBPACK_DEV_SERVER_URL + devPath)
    if (open_dev_tool) {
      if (!process.env.IS_TEST) window.webContents.openDevTools()
    }
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    window.loadURL(`app://./${prodPath}`)
    
  }
  window.on('closed', () => { window = null })
  window.once('ready-to-show', () => {
    window.show()
    window.focus()
  })
  return window
}

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
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})





// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  if (!process.env.WEBPACK_DEV_SERVER_URL) {
    createProtocol('app')
  }
  
  mainwin = createWindow('', 'index.html', 800, 600)
  checkwin = createWindow('subpage', 'subpage.html', 300, 500)
  let trayPath
  trayPath = path.join(__static, '/tray/TrayIcon.png')
  tray = new Tray(trayPath)
  const contextMenu = Menu.buildFromTemplate([
    {label: 'OpenTools', click() {
      mainwin.then(
        data => data.show()
      )
    }},
    {label: 'Exit', click() {
      mainwin.then(
        (data) => {
          data.close()
          tray.destroy()
        }
      )
    }}
  ])
  tray.setToolTip('hello')
  tray.setContextMenu(contextMenu)
})







// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

async function checkstartfile(win) {
  const db_path = `${app.getPath('exe')}/data/schedule.db`
  if (fs.existsSync(db_path)) {
    mkdirSync(db_path)
    win.webContents.send('first-execute')
    first_execute = true
  } else {
  }
}

ipcMain.on('window-close', event => {
  const win = BrowserWindow.fromId(event.sender.id)
  win.hide()
})

ipcMain.on('window-fullscreen', event => {
  const win = BrowserWindow.fromId(event.sender.id)
  if (win.isMaximized()) {
    win.unmaximize()
  }
  else {
    win.maximize()
  }
})

ipcMain.on('window-minimum', event => {
  const win = BrowserWindow.fromId(event.sender.id)
  win.minimize()
})

ipcMain.on('window-quit', event => {
  const win = BrowserWindow.fromId(event.sender.id)
  win.close()
})

// check db and get data

// get current month schedule
//connect db and disconnect db, because connected db is allocated in memory
ipcMain.on('get-db', event => {
  const db_path = `${app.getPath('exe')}/data/schedule.db`

})

// check start things
ipcMain.once('ready-to-check', async function () {
  const win = await checkwin
  checkstartfile(win)
  win.webContents.send('check-update-done')
})