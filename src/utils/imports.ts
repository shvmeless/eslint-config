// IMPORTS
// @ts-expect-error No types provided for 'eslint-config-standard'
import standardConfig from 'eslint-config-standard'
import standardTsConfig from 'eslint-config-love'
// @ts-expect-error No types provided for 'eslint-config-standard'
import reactRecommendedConfig from 'eslint-plugin-react'
import { writeTemp } from './file-writing'
import { object } from './common'
import { existsSync, mkdirSync, rmSync } from 'fs'
import { join } from 'path'

// INTERFACE
interface Config {
  config: Record<string, any>
  rules: Record<string, any>
}

// FUNCTION
function getStandardConfig (): Config {
  const config = object(standardConfig)
  const rules = object(config.rules)
  delete config.rules

  writeTemp(config, 'imports/standard-config.json')
  writeTemp(rules, 'imports/standard-rules.json')

  return { config, rules }
}

// FUNCTION
function getStandardTSConfig (): Config {
  const config = object(standardTsConfig)
  const rules = object(config.rules)
  delete config.rules

  writeTemp(config, 'imports/standard-ts-config.json')
  writeTemp(rules, 'imports/standard-ts-rules.json')

  return { config, rules }
}

// FUNCTION
function getReactRecommendedConfig (): Config {
  const config = object(reactRecommendedConfig.configs.recommended)
  const rules = object(config.rules)
  delete config.rules

  writeTemp(config, 'imports/react-recommended-config.json')
  writeTemp(rules, 'imports/react-recommended-rules.json')

  return { config, rules }
}

const tempPath = join(__dirname, '..', '..', 'temp')
if (existsSync(tempPath)) rmSync(tempPath, { recursive: true })
mkdirSync(tempPath)

// CONFIGS
const standard = getStandardConfig()
const standardTS = getStandardTSConfig()
const reactRecommended = getReactRecommendedConfig()

// EXPORTS
export const importedConfigs = {
  standard: (): Config => (JSON.parse(JSON.stringify(standard))),
  standardTS: (): Config => (JSON.parse(JSON.stringify(standardTS))),
  reactRecommended: (): Config => (JSON.parse(JSON.stringify(reactRecommended))),
}
