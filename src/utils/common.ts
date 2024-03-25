// IMPORTS
import { dictionary } from '@shvmerc/development'

// FUNCTION
export function object (value: unknown): Record<string, any> {
  if (typeof value !== 'object') return {}
  if (value === null) return {}
  return { ...value }
}

// FUNCTION
export function findUnusedRules (rules: Record<string, any>, ...pools: Array<Record<string, any>>): Record<string, any> {
  const unused = object({})
  for (const pool of pools) {
    dictionary(pool).forEach((key, value) => {
      if (rules[key] !== undefined) return
      unused[key] = value
    })
  }
  return unused
}
