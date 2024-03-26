// IMPORTS
import { JAVASCRIPT_RENAMED } from '../data/javascript-renamed-rules'
import { JAVASCRIPT_RULES } from '../data/javascript-rules'
import { STYLISTIC_RULES } from '../data/stylistic-rules'
import { findUnusedRules, object } from '../utils/common'
import { importedConfigs } from '../utils/imports'
import { dictionary } from '@shvmerc/development'

// FUNCTION
export function generateStandardConfig (): {
  config: Record<string, any>
  rules: Record<string, any>
  imports: {
    standard: Record<string, any>
    custom: Record<string, any>
  }
  unused: {
    javascript: Record<string, any>
    stylistic: Record<string, any>
  }
} {

  // IMPORTS

  const standard = importedConfigs.standard()

  // CONFIG

  const config = standard.config
  config.plugins.push('@stylistic')

  // RULES

  const imports = {
    standard: standard.rules,
    custom: object({
      'comma-dangle': ['error', 'always-multiline'],
      'arrow-parens': ['error', 'always'],
      'multiline-ternary': 'off',
      'padded-blocks': 'off',
    }),
  }

  // RENAME

  imports.standard = dictionary(imports.standard).rename((value, key) => {
    const item = JAVASCRIPT_RENAMED[key]
    if (item !== undefined) return item
    return key
  })

  imports.custom = dictionary(imports.custom).rename((value, key) => {
    const item = JAVASCRIPT_RENAMED[key]
    if (item !== undefined) return item
    return key
  })

  // RETURN

  const rules = dictionary(imports.standard).merge(imports.custom)
  const unused = {
    javascript: findUnusedRules(rules, JAVASCRIPT_RULES),
    stylistic: findUnusedRules(rules, STYLISTIC_RULES),
  }

  return { config, rules, imports, unused }

}
