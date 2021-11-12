import { app } from 'electron'
import { menubar } from 'menubar'
import bootIpcMain from './ipcMain'
import path from 'path'
import helper from './helper'

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

function createWindow() {
  const mb = menubar({
    icon: path.join(helper.assetsPath, 'assets', 'icon.png'),
    index: MAIN_WINDOW_WEBPACK_ENTRY,
    tooltip: '❤️ 给我老婆写的脚本 ❤️',
    browserWindow: {
      transparent: true,
      skipTaskbar: true,
      resizable: false,
      width: 250,
      height: 550,
      webPreferences: {
        preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      },
    },
    preloadWindow: true,
  })
  bootIpcMain(mb)

  mb.on('ready', () => {
    console.log('Menubar app is ready.')
    mb.window?.webContents.openDevTools()
  })
}

app
  .on('ready', () => {
    createWindow()

    if (process.platform === 'win32') {
      app.setAppUserModelId('胡彬清助理')
    }
  })
  .whenReady()
  .catch(e => console.error(e))
