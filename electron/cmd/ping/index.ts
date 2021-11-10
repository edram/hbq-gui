import { ChildProcessWithoutNullStreams, spawn } from 'child_process'
import path from 'path'

type CmdProcess = ChildProcessWithoutNullStreams | null

let pingCmd: CmdProcess = null

interface Cmd {
  start(): ChildProcessWithoutNullStreams
  kill: Function
  process: CmdProcess
}

const cmd: Cmd = {
  start() {
    if (pingCmd != null) {
      return pingCmd
    }
    pingCmd = spawn('node', [path.join(__dirname, 'ping.js')])
    pingCmd.stdout.setEncoding('utf8')
    return pingCmd
  },
  kill() {
    pingCmd?.kill()
    pingCmd = null
  },
  get process() {
    return pingCmd
  },
}

export default cmd
