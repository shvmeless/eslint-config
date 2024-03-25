// IMPORTS
import { generateStandardTSConfig } from './configs/standard-ts'
import { generateStandardConfig } from './configs/standard'
import { writeConfig } from './utils/file-writing'
import { existsSync, mkdirSync, rmSync } from 'fs'
import { join } from 'path'

const distPath = join(__dirname, '..', 'dist')
if (existsSync(distPath)) rmSync(distPath, { recursive: true })
mkdirSync(distPath)

const tempPath = join(__dirname, '..', 'temp')
if (existsSync(tempPath)) rmSync(tempPath, { recursive: true })
mkdirSync(tempPath)

const standard = generateStandardConfig()
writeConfig(standard, 'standard')

const standardTS = generateStandardTSConfig()
writeConfig(standardTS, 'standard-ts')
