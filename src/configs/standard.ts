// IMPORTS
import { JAVASCRIPT_RENAMED } from '../data/javascript-renamed-rules'
import { JAVASCRIPT_RULES } from '../data/javascript-rules'
import { STYLISTIC_RULES } from '../data/stylistic-rules'
import { findUnusedRules, object } from '../utils/common'
import { importedConfigs } from '../utils/imports'
import { writeTemp } from '../utils/file-writing'
import { dictionary } from '@shvmerc/development'

// FUNCTION
export function generateStandardConfig (): Record<string, any> {
  const imports = { standard: importedConfigs.standard() }

  // CONFIG

  const config = imports.standard.config
  config.plugins.push('@stylistic')

  // RULES

  const rules = {
    standard: imports.standard.rules,
    custom: object({})
  }

  rules.custom = {
    'comma-dangle': ['error', 'always-multiline'],
    'arrow-parens': ['error', 'always'],
    'multiline-ternary': 'off',
    'padded-blocks': 'off'
  }

  // RENAME

  rules.standard = dictionary(rules.standard).rename((value, key) => {
    const item = JAVASCRIPT_RENAMED[key]
    if (item !== undefined) return item
    return key
  })

  rules.custom = dictionary(rules.custom).rename((value, key) => {
    const item = JAVASCRIPT_RENAMED[key]
    if (item !== undefined) return item
    return key
  })

  // MERGE

  config.rules = dictionary(rules.standard).merge(rules.custom)

  // LOGS

  writeTemp(rules.standard, 'standard/standard-rules.json')
  writeTemp(rules.custom, 'standard/custom-rules.json')

  // UNUSED

  const unused = findUnusedRules(object(config.rules), JAVASCRIPT_RULES, STYLISTIC_RULES)
  writeTemp(unused, 'standard/unused-rules.json')

  // RETURN
  return config
}
