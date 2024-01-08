import { spawn } from "child_process"

export default function executeAdbReverse(port) {
  const process = spawn('adb', ['reverse', `tcp:${port}`, `tcp:${port}`])

  process.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`)
  })

  process.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`)
  })

  process.on('close', (code) => {
    console.log(`adb reverse process exited with code ${code}`)
  })
}