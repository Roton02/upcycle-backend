/* eslint-disable @typescript-eslint/no-explicit-any */
export function flattenObject(
  obj: Record<string, any>,
  prefix = ''
): Record<string, any> {
  return Object.keys(obj).reduce(
    (acc, key) => {
      const path = prefix ? `${prefix}.${key}` : key

      if (
        typeof obj[key] === 'object' &&
        !Array.isArray(obj[key]) &&
        obj[key] !== null
      ) {
        // Recursively flatten nested objects
        Object.assign(acc, flattenObject(obj[key], path))
      } else {
        // Assign primitive values or arrays directly
        acc[path] = obj[key]
      }

      return acc
    },
    {} as Record<string, any>
  )
}
