import { pathmap } from '../visitors'

/**
 * Returns all paths-expressions to all values of object
 *
 * @param object the object carrying the values
 * @param sepChar the character used to split the path into segments, default '.'
 * @return {Array} array of path expressions
 */

test('empty array for empty object', () => {
  expect(pathmap({})).toEqual([])
})

test('non JSON objects', () => {
  expect(pathmap(new Date())).toEqual([])
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

test('JSON object', () => {
  expect(pathmap(STANDARD_JSON)).toEqual([
    'name',
    'children',
    'children.0',
    'children.0.name',
    'children.0.children',
    'children.0.children.0',
    'children.0.children.0.name',
    'children.0.children.0.value',
    'children.0.children.1',
    'children.0.children.1.name',
    'children.0.children.1.value',
    'children.1',
    'children.1.name',
    'children.1.children',
    'children.1.children.0',
    'children.1.children.0.name',
    'children.1.children.0.value',
    'children.1.children.1',
    'children.1.children.1.name',
    'children.1.children.1.value'
  ])
})
