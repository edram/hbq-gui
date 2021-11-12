import { ChildProcessWithoutNullStreams, spawn } from 'child_process'
import { app } from 'electron'

type CmdProcess = ChildProcessWithoutNullStreams | null

let xyjCmd: CmdProcess = null

interface Cmd {
  start(): ChildProcessWithoutNullStreams
  kill: Function
  process: CmdProcess
  isRuning: boolean
}

const cmd: Cmd = {
  start() {
    if (xyjCmd != null) {
      return xyjCmd
    }
    console.log(app.getAppPath())
    xyjCmd = spawn('/Library/Frameworks/Python.framework/Versions/3.10/bin/mitmweb', ["-s /Users/edram/xhs/xyj.py", "--no-web-open-browser"])
    xyjCmd.stdout.setEncoding('utf8')
    xyjCmd.on('exit', () => {
      console.log('xyj cmd exited')
      xyjCmd = null
    })

    console.log(xyjCmd.pid)
    return xyjCmd
  },
  kill() {
    xyjCmd?.kill()
    xyjCmd = null

    console.log('xyj cmd killed!')
  },
  get process() {
    return xyjCmd
  },
  get isRuning() {
    return !!xyjCmd
  },
}

export default cmd
