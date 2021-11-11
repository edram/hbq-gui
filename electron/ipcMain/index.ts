import { clipboard, ipcMain, Notification } from 'electron'
import { Menubar } from 'menubar'
import bootMenubar from './menubar'
import xyjCmd from '../cmd/xyj'
import { NotificationConstructorOptions } from 'electron/main'
import helper from '../helper'
import path from 'path'

const bootstrap = (mb: Menubar) => {
  ipcMain.on('xyj-start', event => {
    const pingProcess = xyjCmd.start()
    event.returnValue = true

    event.reply('xyj-runing-change', true)

    pingProcess.on('exit', () => {
      event.reply('xyj-runing-change', false)
    })

    pingProcess.stdout.on('data', data => {
      event.reply('xyj-data', data)
    })
  })

  ipcMain.on('xyj-kill', event => {
    xyjCmd.kill()
    event.returnValue = true
  })

  ipcMain.on('xyj-isRunning', event => {
    event.returnValue = xyjCmd.isRuning
  })

  ipcMain.on('clipboard-writeText', (event, text: string) => {
    clipboard.writeText(text)
    event.returnValue = true
  })

  ipcMain.on(
    'notification-send',
    (event, data: NotificationConstructorOptions) => {
      data.icon = path.join(helper.assetsPath, 'assets', 'icon.png')
      new Notification(data).show()
    }
  )

  bootMenubar(mb)
}

export default bootstrap
