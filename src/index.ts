// IMPORTS
import { generateStandardTSConfig } from './configs/standard-ts'
import { writeConfig, writeTemp } from './utils/file-writing'
import { generateStandardConfig } from './configs/standard'
import { existsSync, mkdirSync, rmSync } from 'fs'
import { join } from 'path'

// INIT

const distPath = join(__dirname, '..', 'dist')
if (existsSync(distPath)) rmSync(distPath, { recursive: true })
mkdirSync(distPath)

const tempPath = join(__dirname, '..', 'temp')
if (existsSync(tempPath)) rmSync(tempPath, { recursive: true })
mkdirSync(tempPath)

// STANDARD

const standard = generateStandardConfig()

writeTemp(standard.config, 'standard/standard-config.json')
writeTemp(standard.imports, 'standard/standard-rules.json')
writeTemp(standard.unused, 'standard/standard-unused-rules.json')

writeConfig({
  ...standard.config,
  rules: standard.rules,
}, 'standard')

// STANDARD-TS

const standardTS = generateStandardTSConfig()

writeTemp(standardTS.config, 'standard-ts/standard-ts-config.json')
writeTemp(standardTS.imports, 'standard-ts/standard-ts-rules.json')
writeTemp(standardTS.unused, 'standard-ts/standard-ts-unused-rules.json')

writeConfig({
  ...standardTS.config,
  rules: standardTS.rules,
}, 'standard-ts')
