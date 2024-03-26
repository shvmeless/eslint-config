// IMPORTS
import reactRecommendedTSConfig from './standard-react-typescript.json'
import reactRecommendedConfig from './standard-react.json'
import standardTSConfig from './standard-typescript.json'
import standardConfig from './standard.json'
import { object } from '../utils/common'

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

  return { config, rules }
}

// FUNCTION
function getStandardTSConfig (): Config {
  const config = object(standardTSConfig)
  const rules = object(config.rules)
  delete config.rules

  return { config, rules }
}

// FUNCTION
function getReactRecommendedConfig (): Config {
  const config = object(reactRecommendedConfig)
  const rules = object(config.rules)
  delete config.rules

  return { config, rules }
}

// FUNCTION
function getReactRecommendedTSConfig (): Config {
  const config = object(reactRecommendedTSConfig)
  const rules = object(config.rules)
  delete config.rules

  return { config, rules }
}

// CONFIGS
const standard = getStandardConfig()
const standardTS = getStandardTSConfig()
const reactRecommended = getReactRecommendedConfig()
const reactRecommendedTS = getReactRecommendedTSConfig()

// EXPORTS
export const importedConfigs = {
  standard: (): Config => (JSON.parse(JSON.stringify(standard))),
  standardTS: (): Config => (JSON.parse(JSON.stringify(standardTS))),
  reactRecommended: (): Config => (JSON.parse(JSON.stringify(reactRecommended))),
  reactRecommendedTS: (): Config => (JSON.parse(JSON.stringify(reactRecommendedTS))),
}
