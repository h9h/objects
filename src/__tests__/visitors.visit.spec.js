import { visit } from '../visitors'

/*
 * Apply function fn(key, value) to each value of object
 * @param object the object carrying the values
 * @param fn the function to be applied
 */

const identity = result => (key, value) => result[key] = value

test('"identity" function returns equal simple object', () => {
  const result = {}

  const o = { a: 1, b: 2, c: '[1, 2, 3]'}

  visit(o, identity(result))

  expect(result).toEqual(o)
})

test('flattens nested object and overwrites entries with "identity" function', () => {
  const result = {}

  const o = { a: 1, b: 2, c: { a: 'nested a', b: 'nested b'}}

  visit(o, identity(result))

  expect(result).toEqual({'a': 'nested a', 'b': 'nested b'})
})

test('usecase: get all entries to a certain key from object', () => {
  const result = []

  const o = { a: 1, b: 2, c: { a: 'nested a', b: 'nested b'}}

  const getAllAs = (key, value) => key === 'a' ? result.push(value) : null
  visit(o, getAllAs)

  expect(result).toEqual([1, 'nested a'])
})
