// IMPORTS
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'

// FUNCTION
export function writeConfig (data: Record<string, any>, name: string): void {

  const dirname = join(__dirname, '..', '..', 'dist')

  const json = JSON.stringify(data, null, 2)
  writeFileSync(join(dirname, `${name}.json`), json)
  writeFileSync(join(dirname, `${name}.js`), `module.exports = require('./${name}.json')`)

}

// FUNCTION
export function writeTemp (data: Record<string, any>, name: string): void {

  const path = join(__dirname, '..', '..', 'temp', name)
  const dir = dirname(path)
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })

  const json = JSON.stringify(data, null, 2)
  writeFileSync(path, json)

}
