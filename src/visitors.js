const join = (a: string, b: string, sepChar: string = '.'): string => (a.length > 0 ? a + sepChar + b : b)

const pathmapIter = (object: {}, paths: string[], root: string, sepChar: string) => {
  if (typeof object === 'object') {
    Object.entries(object).forEach(([key, value]) => {
      paths.push(join(root, key, sepChar))
      pathmapIter(value, paths, join(root, key, sepChar), sepChar)
    })
  } else if (Array.isArray(object)) {
    object.forEach((value, index) => {
      paths.push(join(root, index, sepChar))
      pathmapIter(value, paths, join(root, index, sepChar), sepChar)
    })
  }
}

/**
 * Returns all paths-expressions to all values of object
 *
 * @param object the object carrying the values
 * @param sepChar the character used to split the path into segments, default '.'
 * @return {Array} array of path expressions
 */
export const pathmap = (object: {}, sepChar: string = '.'): string[] => {
  const paths = []
  pathmapIter(object, paths, '', sepChar)
  return paths
}

/**
 * Apply function fn(key, value) to each value of object
 * @param object the object carrying the values
 * @param fn the function to be applied
 */
export const visit = (object: {}, fn) => {
  const wrappedFunction = (key, value) => {
    if (typeof value === 'object') {
      visit(value, fn)
    } else if (Array.isArray(value)) {
      value.forEach(value => visit(value, fn))
    } else {
      fn(key, value)
    }
  }

  if (typeof object === 'object') {
    Object.entries(object).forEach(([key, value]) => wrappedFunction(key, value))
  } else if (Array.isArray(object)) {
    object.forEach((value, index) => wrappedFunction(index, value))
  } else {
    wrappedFunction(undefined, object)
  }
}

/**
 * Return a function, which when supplied with a path expression returns value of object at path
 * @param o the object carrying the values
 * @param sepChar the character used to split the path into segments, default '.'
 * @return {function(string): any} takes a path and returns value from object
 */
export const getAtPath = (o: {}, sepChar: string = '.') => (p: string): ?any => {
  if (p == null || p === undefined) return undefined
  const paths = p.split(sepChar)

  let branch = o
  paths.forEach(path => {
    if (branch !== undefined) branch = path === '' ? branch: branch[path]
  })
  return branch
}

/**
 * Return a function, which when supplied with a path expression returns value of parent object at path
 * @param o the object carrying the values
 * @param sepChar the character used to split the path into segments, default '.'
 * @return {function(string): any} takes a path and returns value from object at parent
 */
export const getAtParent = (o: {}, sepChar: string = '.') => (p: string): ?any =>
  getAtPath(o, sepChar)(p.split(sepChar).slice(0, -1).join(sepChar))

/**
 * Get all values to the given keys from the object
 * @param o the object carrying the values
 * @returns {function(string[]): Array}
 */
export const getValues = (o: {}) => (keys: string | string[]): string[] => {
  const result = []
  const myKeys = Array.isArray(keys) ? keys : [keys]
  const fn = (key, value) => (myKeys.includes(key) ? result.push(value) : null)

  visit(o, fn)

  return result
}
