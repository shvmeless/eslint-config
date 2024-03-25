// IMPORTS
import { dictionary } from '@shvmerc/development'

// FUNCTION
export function object (value: unknown): Record<string, any> {
  if (typeof value !== 'object') return {}
  if (value === null) return {}
  return { ...value }
}

// FUNCTION
export function mergeObjects (obj1: Record<string, any>, obj2: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = { ...obj1 }

  dictionary(obj2).forEach((value, key) => {
    if (result[key] === undefined) {
      result[key] = value
      return
    }

    if (Array.isArray(value)) {
      const alternate = result[key]
      if (!Array.isArray(alternate)) throw new Error('Type collision!')
      result[key] = alternate.concat(value)
      return
    }

    if (typeof value === 'object' && value !== null) {
      const alternate = result[key]
      if (typeof alternate !== 'object' || alternate === null) throw new Error('Type collision!')
      result[key] = mergeObjects(alternate as Record<string, any>, value as Record<string, any>)
      return
    }

    result[key] = obj2[key]
  })

  return result
}

// FUNCTION
export function findUnusedRules (rules: Record<string, any>, ...pools: Array<Record<string, any>>): Record<string, any> {
  const unused = object({})
  for (const pool of pools) {
    dictionary(pool).forEach((value, key) => {
      if (rules[key] !== undefined) return
      unused[key] = value
    })
  }
  return unused
}
