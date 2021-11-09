import { ChildProcessWithoutNullStreams, spawn } from 'child_process'
import path from 'path'

type CmdProcess = ChildProcessWithoutNullStreams | null

let pingCmd: CmdProcess = null

interface Cmd {
  start: Function
  process: CmdProcess
}

const cmd: Cmd = {
  start() {
    pingCmd = spawn('node', [path.join(__dirname, 'ping.js')])
    pingCmd.stdout.setEncoding('utf8')
  },
  get process() {
    return pingCmd
  },
}

export default cmd
