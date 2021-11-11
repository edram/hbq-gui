import { ipcMain } from 'electron'
import { Menubar } from 'menubar'

const bootstrap = (mb: Menubar) => {
  ipcMain.on('tray-window-size', (event, height: number) => {
    console.log(height)
    // win.setMinimumSize(width, height)

    mb.window?.setBounds({
      width: 250,
      height: height,
    })
    mb.window?.setSize(250, height)
    mb.showWindow()
    event.returnValue = undefined
  })
}

export default bootstrap
