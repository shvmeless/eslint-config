// IMPORTS
// @ts-expect-error No types provided for 'eslint-config-standard'
import standardConfig from 'eslint-config-standard'
import { writeTemp } from './file-writing'
import { object } from './common'

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

export const importedConfigs = {
  standard: (): Config => (JSON.parse(JSON.stringify(getStandardConfig())))
}
