import { generateFromPathsWithValues } from '../generators'

test('it works for empty object', () => {
  const result = generateFromPathsWithValues({})
  expect(result).toEqual({name: 'Statistics', children: []})
})

test('Option name', () => {
  const result = generateFromPathsWithValues({}, { name: 'Root' })
  expect(result).toEqual({name: 'Root', children: []})
})

const STANDARD_RESULT = {
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

test('Standard case', () => {
  const result = generateFromPathsWithValues({
    'income.2017': 50000,
    'income.2018': 60000,
    'costs.2017': 12000,
    'costs.2018': 11400,
  })

  expect(result).toEqual(STANDARD_RESULT)
})

test('with oprion sepChar', () => {
  const result = generateFromPathsWithValues({
    'income:2017': 50000,
    'income:2018': 60000,
    'costs:2017': 12000,
    'costs:2018': 11400,
  }, {
    sepChar: ':'
  })

  expect(result).toEqual(STANDARD_RESULT)
})
