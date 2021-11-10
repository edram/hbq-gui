import { ipcMain } from 'electron'
import ping from '../cmd/ping'

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
