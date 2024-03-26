// IMPORTS
import { findUnusedRules, mergeObjects, object } from '../utils/common'
import { JAVASCRIPT_RENAMED } from '../data/javascript-renamed-rules'
import { JAVASCRIPT_RULES } from '../data/javascript-rules'
import { REACT_RENAMED } from '../data/react-renamed-rules'
import { STYLISTIC_RULES } from '../data/stylistic-rules'
import { importedConfigs } from '../utils/imports'
import { REACT_RULES } from '../data/react-rules'
import { dictionary } from '@shvmerc/development'

// FUNCTION
export function generateStandardJSXConfig (): {
  config: Record<string, any>
  rules: Record<string, any>
  imports: {
    standard: Record<string, any>
    react: Record<string, any>
    custom: Record<string, any>
  }
  unused: {
    javascript: Record<string, any>
    react: Record<string, any>
    stylistic: Record<string, any>
  }
} {

  // IMPORTS

  const standard = importedConfigs.standard()
  const react = importedConfigs.reactRecommended()

  // CONFIG

  const config = mergeObjects(standard.config, react.config)
  config.plugins.push('@stylistic')

  // RULES

  const imports = {
    standard: standard.rules,
    react: react.rules,
    custom: object({
      'comma-dangle': ['error', 'always-multiline'],
      'arrow-parens': ['error', 'always'],
      'multiline-ternary': 'off',
      'padded-blocks': 'off',
      'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
      'react/jsx-curly-brace-presence': ['error', {
        props: 'never',
        children: 'always',
        propElementValues: 'always',
      }],
      'react/jsx-curly-spacing': ['error', 'never'],
      'react/jsx-equals-spacing': ['error', 'never'],
      'react/jsx-indent': ['error', 2],
      'react/jsx-indent-props': ['error', 2],
      'react/jsx-props-no-multi-spaces': 'error',
      'react/jsx-quotes': ['error', 'prefer-single'],
      'react/jsx-self-closing-comp': ['error', {
        component: true,
        html: true,
      }],
      'react/jsx-tag-spacing': ['error', {
        closingSlash: 'never',
        beforeSelfClosing: 'never',
        afterOpening: 'never',
        beforeClosing: 'never',
      }],
      'react/react-in-jsx-scope': 'off',
    }),
  }

  // RENAME

  imports.standard = dictionary(imports.standard).rename((value, key) => {
    const item = JAVASCRIPT_RENAMED[key]
    if (item !== undefined) return item
    return key
  })

  imports.react = dictionary(imports.react).rename((value, key) => {
    const item = REACT_RENAMED[key]
    if (item !== undefined) return item
    return key
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

  const rules = dictionary(imports.standard).merge(imports.react, imports.custom)
  const unused = {
    javascript: findUnusedRules(rules, JAVASCRIPT_RULES),
    react: findUnusedRules(rules, REACT_RULES),
    stylistic: findUnusedRules(rules, STYLISTIC_RULES),
  }

  return { config, rules, imports, unused }

}
