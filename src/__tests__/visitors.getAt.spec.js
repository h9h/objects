import { getAtPath, getAtParent, getValues } from '../visitors'

/**
 * Return a function, which when supplied with a path expression returns value of object at path
 * @param o the object carrying the values
 * @param sepChar the character used to split the path into segments, default '.'
 * @return {function(string): any} takes a path and returns value from object
 */

test('return undefined at any non-empty path for empty object', () => {
  const fn = getAtPath({})

  expect(fn(null)).toBe(undefined)
  expect(fn('name')).toBe(undefined)
  expect(fn('')).toEqual({})
})

const STANDARD_JSON = {
  name: 'Statistics',
  children: [
    {
      name: 'income',
      children: [
        {
          name: '2017',
          value: 50000,
        },
        {
          name: '2018',
          value: 60000,
        },
      ],
    },
    {
      name: 'costs',
      children: [
        {
          name: '2017',
          value: 12000,
        },
        {
          name: '2018',
          value: 11400,
        },
      ],
    },
  ],
}

test('get value from path', () => {
  const fn = getAtPath(STANDARD_JSON)

  expect(fn('name')).toBe('Statistics')
  expect(fn('children.1.children.0.value')).toBe(12000)
})

test('get value from path with non-standard sepChar', () => {
  const fn = getAtPath(STANDARD_JSON, '|')

  expect(fn('name')).toBe('Statistics')
  expect(fn('children|1|children|0|value')).toBe(12000)
})

test('get parent from path', () => {
  const fn = getAtParent(STANDARD_JSON)

  expect(fn('name')).toBe(STANDARD_JSON)
  expect(fn('children.1.children.0.value')).toBe(STANDARD_JSON.children[1].children[0])
})

/**
 * Get all values to the given keys from the object
 * @param o the object carrying the values
 * @returns {function(string[]): Array}
 */

test('get empty Array on empty object', () => {
  const fn = getValues({})

  expect(fn('a')).toEqual([])
})

test('get values to keys', () => {
  const fn = getValues(STANDARD_JSON)

  expect(fn(['name', 'value'])).toEqual(['Statistics', 'income', '2017', 50000, '2018', 60000, 'costs', '2017', 12000, '2018', 11400])
})
