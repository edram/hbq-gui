import { ChildProcessWithoutNullStreams, spawn } from 'child_process'
import { app } from 'electron'
import path from 'path'

type CmdProcess = ChildProcessWithoutNullStreams | null

let pingCmd: CmdProcess = null

interface Cmd {
  start(): ChildProcessWithoutNullStreams
  kill: Function
  process: CmdProcess
  isRuning: boolean
}

const cmd: Cmd = {
  start() {
    if (pingCmd != null) {
      return pingCmd
    }
    console.log(app.getAppPath())
    pingCmd = spawn('node', [
      path.join(app.getAppPath(), './electron/cmd/ping', 'ping.js'),
    ])
    pingCmd.stdout.setEncoding('utf8')
    pingCmd.on('exit', () => {
      console.log('ping cmd exited')
      pingCmd = null
    })

    console.log(pingCmd.pid)
    return pingCmd
  },
  kill() {
    pingCmd?.kill()
    pingCmd = null

    console.log('ping cmd killed!')
  },
  get process() {
    return pingCmd
  },
  get isRuning() {
    return !!pingCmd
  },
}

export default cmd
