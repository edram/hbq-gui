import { clipboard, ipcMain, Notification } from 'electron'
import { Menubar } from 'menubar'
import bootMenubar from './menubar'
import xyjCmd from '../cmd/xyj'
import slCmd from '../cmd/sl'
import { NotificationConstructorOptions } from 'electron/main'
import helper from '../helper'
import path from 'path'
import { exec } from 'child_process'

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

  ipcMain.on('sl-start', event => {
    const pingProcess = slCmd.start()
    event.returnValue = true

    event.reply('sl-runing-change', true)

    pingProcess.on('exit', () => {
      event.reply('sl-runing-change', false)
    })

    pingProcess.stdout.on('data', data => {
      console.log(data)
      event.reply('sl-data', data)
    })
  })

  ipcMain.on('sl-kill', event => {
    slCmd.kill()
    event.returnValue = true
  })

  ipcMain.on('sl-isRunning', event => {
    event.returnValue = slCmd.isRuning
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

  ipcMain.on('exec-cmd', (event, cmd) => {
    exec(cmd)
  })

  bootMenubar(mb)
}

export default bootstrap
