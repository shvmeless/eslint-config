// IMPORTS
import { object, mergeObjects, findUnusedRules } from '../utils/common'
import { JAVASCRIPT_RENAMED } from '../data/javascript-renamed-rules'
import { TYPESCRIPT_RENAMED } from '../data/typescript-renamed-rules'
import { TYPESCRIPT_RULES } from '../data/typescript-rules'
import { JAVASCRIPT_RULES } from '../data/javascript-rules'
import { STYLISTIC_RULES } from '../data/stylistic-rules'
import { importedConfigs } from '../utils/imports'
import { writeTemp } from '../utils/file-writing'
import { dictionary } from '@shvmerc/development'

// FUNCTION
export function generateStandardTSConfig (): Record<string, any> {

  const imports = {
    standard: importedConfigs.standard(),
    standardTS: importedConfigs.standardTS(),
  }

  // CONFIG

  const config = mergeObjects(imports.standard.config, imports.standardTS.config)
  config.plugins.push('@stylistic')
  delete config.extends

  // RULES

  const rules = {
    standard: imports.standard.rules,
    standardTS: imports.standardTS.rules,
    overwritten: object({}),
    custom: object({}),
  }

  rules.standardTS = dictionary(rules.standardTS).filter((value, key) => {
    if (rules.standard[key] === undefined) return true
    rules.overwritten[key] = value
    return false
  })

  rules.custom = {
    'comma-dangle': ['error', 'always-multiline'],
    'arrow-parens': ['error', 'always'],
    'multiline-ternary': 'off',
    'padded-blocks': 'off',
    '@typescript-eslint/no-unsafe-declaration-merging': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'error',
    '@typescript-eslint/no-unsafe-argument': 'error',
    '@typescript-eslint/no-unsafe-return': 'error',
    '@typescript-eslint/no-unsafe-call': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { args: 'after-used', caughtErrors: 'none', ignoreRestSiblings: true, vars: 'all' }],
    '@typescript-eslint/array-type': ['error', { default: 'generic', readonly: 'generic' }],
  }

  // RENAME

  rules.standard = dictionary(rules.standard).rename((value, key) => {
    const item = JAVASCRIPT_RENAMED[key]
    if (item !== undefined) return item
    return key
  })

  rules.overwritten = dictionary(rules.overwritten).rename((value, key) => {
    const item = JAVASCRIPT_RENAMED[key]
    if (item !== undefined) return item
    return key
  })

  rules.standardTS = dictionary(rules.standardTS).rename((value, key) => {
    let item = JAVASCRIPT_RENAMED[key]
    if (item !== undefined) return item
    item = TYPESCRIPT_RENAMED[key]
    if (item !== undefined) return item
    return key
  })

  rules.custom = dictionary(rules.custom).rename((value, key) => {
    let item = JAVASCRIPT_RENAMED[key]
    if (item !== undefined) return item
    item = TYPESCRIPT_RENAMED[key]
    if (item !== undefined) return item
    return key
  })

  // MERGE
  config.rules = dictionary(rules.standard).merge(rules.overwritten, rules.standardTS, rules.custom)

  // LOGS

  writeTemp(rules.standard, 'standard-ts/standard-rules.json')
  writeTemp(rules.overwritten, 'standard-ts/overwritten-rules.json')
  writeTemp(rules.standardTS, 'standard-ts/standard-ts-rules.json')
  writeTemp(rules.custom, 'standard-ts/custom-rules.json')

  // UNUSED

  const unused = findUnusedRules(object(config.rules), JAVASCRIPT_RULES, TYPESCRIPT_RULES, STYLISTIC_RULES)
  writeTemp(unused, 'standard-ts/unused-rules.json')

  // RETURN
  return config

}
