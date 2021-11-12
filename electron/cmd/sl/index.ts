import { ChildProcessWithoutNullStreams, spawn } from 'child_process'
import { app } from 'electron'

type CmdProcess = ChildProcessWithoutNullStreams | null

let slCmd: CmdProcess = null

interface Cmd {
  start(): ChildProcessWithoutNullStreams
  kill: Function
  process: CmdProcess
  isRuning: boolean
}

const cmd: Cmd = {
  start() {
    if (slCmd != null) {
      return slCmd
    }
    console.log(app.getAppPath())
    slCmd = spawn('mitmweb', ["-s /Users/edram/xhs/sl.py", "--no-web-open-browser"])
    slCmd.stdout.setEncoding('utf8')
    slCmd.on('exit', () => {
      console.log('sl cmd exited')
      slCmd = null
    })

    console.log(slCmd.pid)
    return slCmd
  },
  kill() {
    slCmd?.kill()
    slCmd = null

    console.log('sl cmd killed!')
  },
  get process() {
    return slCmd
  },
  get isRuning() {
    return !!slCmd
  },
}

export default cmd
