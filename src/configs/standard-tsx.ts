// IMPORTS
import { object, mergeObjects, findUnusedRules } from '../utils/common'
import { JAVASCRIPT_RENAMED } from '../data/javascript-renamed-rules'
import { TYPESCRIPT_RENAMED } from '../data/typescript-renamed-rules'
import { TYPESCRIPT_RULES } from '../data/typescript-rules'
import { JAVASCRIPT_RULES } from '../data/javascript-rules'
import { STYLISTIC_RULES } from '../data/stylistic-rules'
import { importedConfigs } from '../utils/imports'
import { dictionary } from '@shvmerc/development'

// FUNCTION
export function generateStandardTSConfig (): {
  config: Record<string, any>
  rules: Record<string, any>
  imports: {
    standard: Record<string, any>
    standardTS: Record<string, any>
    react: Record<string, any>
    custom: Record<string, any>
  }
  unused: {
    javascript: Record<string, any>
    typescript: Record<string, any>
    react: Record<string, any>
    stylistic: Record<string, any>
  }
} {

  const standard = importedConfigs.standard()
  const standardTS = importedConfigs.standardTS()
  const react = importedConfigs.reactRecommended()

  // CONFIG

  let config = mergeObjects(standard.config, standardTS.config)
  config.plugins.push('@stylistic')
  delete config.extends
  config = mergeObjects(config, react.config)

  // RULES

  const imports = {
    standard: standard.rules,
    standardTS: standardTS.rules,
    custom: object({
      'comma-dangle': ['error', 'always-multiline'],
      'arrow-parens': ['error', 'always'],
      'multiline-ternary': 'off',
      'padded-blocks': 'off',
      '@typescript-eslint/no-unsafe-declaration-merging': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unused-vars': ['error', {
        args: 'after-used',
        caughtErrors: 'none',
        ignoreRestSiblings: true,
        vars: 'all',
      }],
      '@typescript-eslint/array-type': ['error', {
        default: 'generic',
        readonly: 'generic',
      }],
    }),
  }

  // RENAME

  imports.standard = dictionary(imports.standard).rename((value, key) => {
    const item = JAVASCRIPT_RENAMED[key]
    if (item !== undefined) return item
    return key
  })

  imports.standardTS = dictionary(imports.standardTS).rename((value, key) => {
    const item = JAVASCRIPT_RENAMED[key]
    if (item !== undefined) return item
    return key
  })

  imports.standardTS = dictionary(imports.standardTS).rename((value, key) => {
    const item = TYPESCRIPT_RENAMED[key]
    if (item !== undefined) return item
    return key
  })

  imports.custom = dictionary(imports.custom).rename((value, key) => {
    const item = JAVASCRIPT_RENAMED[key]
    if (item !== undefined) return item
    return key
  })

  imports.custom = dictionary(imports.custom).rename((value, key) => {
    const item = TYPESCRIPT_RENAMED[key]
    if (item !== undefined) return item
    return key
  })

  // RETURN

  const rules = dictionary(imports.standard).merge(imports.standardTS, imports.custom)
  const unused = {
    javascript: findUnusedRules(rules, JAVASCRIPT_RULES),
    typescript: findUnusedRules(rules, TYPESCRIPT_RULES),
    stylistic: findUnusedRules(rules, STYLISTIC_RULES),
  }

  return { config, rules, imports, unused }

}
