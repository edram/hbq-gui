import { clipboard, ipcMain, Notification } from 'electron'
import { Menubar } from 'menubar'
import bootMenubar from './menubar'
import ping from '../cmd/ping'

const bootstrap = (mb: Menubar) => {
  ipcMain.on('ping-start', event => {
    const pingProcess = ping.start()
    event.returnValue = true

    event.reply('ping-runing-change', true)

    pingProcess.on('exit', () => {
      event.reply('ping-runing-change', false)
    })

    pingProcess.stdout.on('data', data => {
      event.reply('ping-data', data)
    })
  })

  ipcMain.on('ping-kill', event => {
    ping.kill()
    event.returnValue = true
  })

  ipcMain.on('ping-isRunning', event => {
    event.returnValue = ping.isRuning
  })

  ipcMain.on('clipboard-writeText', (event, text: string) => {
    clipboard.writeText(text)
    event.returnValue = true
  })

  ipcMain.on('notification-send', (event, data) => {
    new Notification(data).show()
  })

  bootMenubar(mb)
}

export default bootstrap
