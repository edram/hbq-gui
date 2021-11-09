import { exec, spawn } from 'child_process'
import { app, Menu, Tray } from 'electron'
import { menubar } from 'menubar'
import ping from './cmd/ping'
import path from 'path'

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

const assetsPath =
  process.env.NODE_ENV === 'production'
    ? process.resourcesPath
    : app.getAppPath()

function createWindow() {
  const tray = new Tray(path.join(assetsPath, 'assets', 'IconTemplate.png'))
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'ping',
      click: () => {
        console.log(ping.process)
        ping.start()
        console.log(ping.process)
      },
    },
    {
      label: 'ping2',
      click: () => {
        console.log(path.join(__dirname, 'ping.js'))
        const pingCmd = spawn('node', [path.join(__dirname, 'ping.js')])
        pingCmd.stdout.setEncoding('utf8')
        pingCmd.stdout.on('data', chunk => {
          process.stdout.write(chunk)

          mb?.window?.webContents.send('ping', chunk)
        })
      },
    },
    {
      label: '编辑文件',
      click: () => {
        exec(`code ${__dirname}`, error => {
          if (error) {
            // log.error(`exec error: ${error}`)
          }
        })
      },
    },
    {
      label: '退出',
      click: () => {
        // log.info('force quit')
        tray?.displayBalloon({ title: '123', content: '12' })
        // app.quit();
      },
    },
  ])
  tray.setToolTip('给我老婆写的脚本')
  tray.setContextMenu(contextMenu)

  const mb = menubar({
    tray,
    index: MAIN_WINDOW_WEBPACK_ENTRY,
    browserWindow: {
      transparent: true,
      skipTaskbar: true,
      resizable: false,
      width: 250,
      height: 150,
      alwaysOnTop: true,
      webPreferences: {
        preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      },
    },
    preloadWindow: true,
  })

  mb.on('ready', () => {
    console.log('Menubar app is ready.')
    // your app code here
  })
}

app
  .on('ready', createWindow)
  .whenReady()
  .catch(e => console.error(e))
