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
   * 启动 ping 命令
   * @returns boolean
   */
  startPing: (): boolean => {
    return ipcRenderer.sendSync('ping-start')
  },

  killPing: (): boolean => {
    return ipcRenderer.sendSync('ping-kill')
  },

  isPingRunning: (): boolean => {
    return ipcRenderer.sendSync('ping-isRunning')
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
}

contextBridge.exposeInMainWorld('Main', api)
console.log('preload 已加载')
