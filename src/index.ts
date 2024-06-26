// IMPORTS
import { generateStandardJSXConfig } from './configs/standard-jsx'
import { generateStandardTSXConfig } from './configs/standard-tsx'
import { generateStandardTSConfig } from './configs/standard-ts'
import { writeConfig, writeTemp } from './utils/file-writing'
import { generateStandardConfig } from './configs/standard'
import { existsSync, mkdirSync, rmSync } from 'fs'
import { join } from 'path'

// INIT

const tempPath = join(__dirname, '..', '..', 'temp')
if (existsSync(tempPath)) rmSync(tempPath, { recursive: true })
mkdirSync(tempPath)

const distPath = join(__dirname, '..', 'dist')
if (existsSync(distPath)) rmSync(distPath, { recursive: true })
mkdirSync(distPath)

// STANDARD

const standard = generateStandardConfig()

writeTemp(standard.config, 'standard/standard-config.json')
writeTemp(standard.imports, 'standard/standard-rules.json')
writeTemp(standard.unused, 'standard/standard-unused-rules.json')

writeConfig({
  ...standard.config,
  rules: standard.rules,
}, 'standard')

// STANDARD TS

const standardTS = generateStandardTSConfig()

writeTemp(standardTS.config, 'standard-ts/standard-ts-config.json')
writeTemp(standardTS.imports, 'standard-ts/standard-ts-rules.json')
writeTemp(standardTS.unused, 'standard-ts/standard-ts-unused-rules.json')

writeConfig({
  ...standardTS.config,
  rules: standardTS.rules,
}, 'standard-ts')

// STANDARD JSX

const standardJSX = generateStandardJSXConfig()

writeTemp(standardJSX.config, 'standard-jsx/standard-jsx-config.json')
writeTemp(standardJSX.imports, 'standard-jsx/standard-jsx-rules.json')
writeTemp(standardJSX.unused, 'standard-jsx/standard-jsx-unused-rules.json')

writeConfig({
  ...standardJSX.config,
  rules: standardJSX.rules,
}, 'standard-jsx')

// STANDARD JSX

const standardTSX = generateStandardTSXConfig()

writeTemp(standardTSX.config, 'standard-tsx/standard-tsx-config.json')
writeTemp(standardTSX.imports, 'standard-tsx/standard-tsx-rules.json')
writeTemp(standardTSX.unused, 'standard-tsx/standard-tsx-unused-rules.json')

writeConfig({
  ...standardTSX.config,
  rules: standardTSX.rules,
}, 'standard-tsx')
