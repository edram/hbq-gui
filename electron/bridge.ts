import { contextBridge, ipcRenderer } from 'electron'
import { NotificationConstructorOptions } from 'electron/main'

export const api = {
  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data))
  },

  removeAllListeners: (channel: string) => {
    ipcRenderer.removeAllListeners(channel)
  },

  /**
   * 启动 小眼睛 命令
   * @returns boolean
   */
  startXyj: (): boolean => {
    return ipcRenderer.sendSync('xyj-start')
  },

  killXyj: (): boolean => {
    return ipcRenderer.sendSync('xyj-kill')
  },

  isXyjRunning: (): boolean => {
    return ipcRenderer.sendSync('xyj-isRunning')
  },

  /**
   * tray window
   */
  changeTrayWindowSize: (height: number) => {
    ipcRenderer.sendSync('tray-window-size', height)
  },

  setClipboard: (text: string) => {
    ipcRenderer.sendSync('clipboard-writeText', text)
  },

  notify: (data: NotificationConstructorOptions) => {
    ipcRenderer.send('notification-send', data)
  },

  exec: (cmd: string) => {
    ipcRenderer.send('exec-cmd', cmd)
  },
}

contextBridge.exposeInMainWorld('Main', api)
console.log('preload 已加载')
