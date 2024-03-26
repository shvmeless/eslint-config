/* eslint-disable @typescript-eslint/no-dynamic-delete */
// IMPORTS
import { JAVASCRIPT_RENAMED } from '../data/javascript-renamed-rules'
import { TYPESCRIPT_RENAMED } from '../data/typescript-renamed-rules'
import { TYPESCRIPT_RULES } from '../data/typescript-rules'
import { JAVASCRIPT_RULES } from '../data/javascript-rules'
import { STYLISTIC_RULES } from '../data/stylistic-rules'
import { object, findUnusedRules } from '../utils/common'
import { importedConfigs } from '../imports/imports'
import { dictionary } from '@shvmerc/development'

// FUNCTION
export function generateStandardTSConfig (): {
  config: Record<string, any>
  rules: Record<string, any>
  imports: {
    javascript: Record<string, any>
    typescript: Record<string, any>
    stylistic: Record<string, any>
    custom: Record<string, any>
  }
  unused: {
    javascript: Record<string, any>
    typescript: Record<string, any>
    stylistic: Record<string, any>
  }
} {

  const standardTS = importedConfigs.standardTS()

  // CONFIG

  const config = standardTS.config
  config.plugins.push('@stylistic')
  delete config.extends

  // RULES

  const imports = {
    javascript: object({}),
    typescript: object({}),
    stylistic: object({}),
    custom: object({}),
  }

  imports.typescript = dictionary(standardTS.rules).filter((value, name) => {
    if (!name.startsWith('@typescript-eslint/')) return false
    delete standardTS.rules[name]
    return true
  })

  imports.javascript = standardTS.rules

  imports.custom = object({
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
  })

  // RENAME

  imports.javascript = dictionary(imports.javascript).filter((value, key) => {
    const item = JAVASCRIPT_RENAMED[key]
    if (item === undefined) return true
    imports.stylistic[item] = value
    return false
  })

  imports.typescript = dictionary(imports.typescript).filter((value, key) => {
    const item = TYPESCRIPT_RENAMED[key]
    if (item === undefined) return true
    imports.stylistic[item] = value
    return false
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

  const rules = dictionary(imports.javascript).merge(imports.typescript, imports.stylistic, imports.custom)
  const unused = {
    javascript: findUnusedRules(rules, JAVASCRIPT_RULES),
    typescript: findUnusedRules(rules, TYPESCRIPT_RULES),
    stylistic: findUnusedRules(rules, STYLISTIC_RULES),
  }

  return { config, rules, imports, unused }

}
