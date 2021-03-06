import { contextBridge, ipcRenderer } from 'electron'

export const api = {
  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data))
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
}

contextBridge.exposeInMainWorld('Main', api)
console.log('preload 已加载')
