import path from 'node:path'
import fs from 'fs-extra'

export function logicalWriteFile(filepath: string, content: string) {
  // ensure directory exists
  const dir = path.dirname(filepath)
  fs.ensureDirSync(dir)

  const isFileExisting = fs.existsSync(filepath)
  if (isFileExisting) {
    const oldContent = fs.readFileSync(filepath, 'utf-8')
    if (oldContent === content) {
      return
    }
  }

  fs.writeFileSync(filepath, content)
}
