/* eslint-disable @typescript-eslint/no-dynamic-delete */
// IMPORTS
import { JAVASCRIPT_RENAMED } from '../data/javascript-renamed-rules'
import { JAVASCRIPT_RULES } from '../data/javascript-rules'
import { REACT_RENAMED } from '../data/react-renamed-rules'
import { STYLISTIC_RULES } from '../data/stylistic-rules'
import { findUnusedRules, object } from '../utils/common'
import { importedConfigs } from '../imports/imports'
import { REACT_RULES } from '../data/react-rules'
import { dictionary } from '@shvmerc/development'

// FUNCTION
export function generateStandardJSXConfig (): {
  config: Record<string, any>
  rules: Record<string, any>
  imports: {
    javascript: Record<string, any>
    react: Record<string, any>
    stylistic: Record<string, any>
    custom: Record<string, any>
  }
  unused: {
    javascript: Record<string, any>
    react: Record<string, any>
    stylistic: Record<string, any>
  }
} {

  // IMPORTS

  const reactRecommended = importedConfigs.reactRecommended()

  // CONFIG

  const config = reactRecommended.config
  config.plugins.push('@stylistic')

  // RULES

  const imports = {
    javascript: object({}),
    react: object({}),
    stylistic: object({}),
    custom: object({}),
  }

  imports.react = dictionary(reactRecommended.rules).filter((value, name) => {
    if (!name.startsWith('react/')) return false
    delete reactRecommended.rules[name]
    return true
  })

  imports.javascript = reactRecommended.rules

  imports.custom = {
    'comma-dangle': ['error', 'always-multiline'],
    'arrow-parens': ['error', 'always'],
    'multiline-ternary': 'off',
    'padded-blocks': 'off',
    'jsx-quotes': ['error', 'prefer-single'],
    '@stylistic/jsx-closing-bracket-location': ['error', 'line-aligned'],
    '@stylistic/jsx-curly-brace-presence': ['error', {
      props: 'never',
      children: 'always',
      propElementValues: 'always',
    }],
    '@stylistic/jsx-curly-spacing': ['error', 'never'],
    '@stylistic/jsx-equals-spacing': ['error', 'never'],
    '@stylistic/jsx-indent': ['error', 2],
    '@stylistic/jsx-indent-props': ['error', 2],
    '@stylistic/jsx-props-no-multi-spaces': 'error',
    '@stylistic/jsx-self-closing-comp': ['error', {
      component: true,
      html: true,
    }],
    '@stylistic/jsx-tag-spacing': ['error', {
      closingSlash: 'never',
      beforeSelfClosing: 'never',
      afterOpening: 'never',
      beforeClosing: 'never',
    }],
    'react/react-in-jsx-scope': 'off',
  }

  // RENAME

  imports.javascript = dictionary(imports.javascript).filter((value, key) => {
    const item = JAVASCRIPT_RENAMED[key]
    if (item === undefined) return true
    imports.stylistic[item] = value
    return false
  })

  imports.react = dictionary(imports.react).filter((value, key) => {
    const item = REACT_RENAMED[key]
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
    const item = REACT_RENAMED[key]
    if (item !== undefined) return item
    return key
  })

  // RETURN

  const rules = dictionary(imports.javascript).merge(imports.react, imports.stylistic, imports.custom)
  const unused = {
    javascript: findUnusedRules(rules, JAVASCRIPT_RULES),
    react: findUnusedRules(rules, REACT_RULES),
    stylistic: findUnusedRules(rules, STYLISTIC_RULES),
  }

  return { config, rules, imports, unused }

}
