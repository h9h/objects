# objects
Utility methods for manipulating and working with objects

Install with
```
yarn add @h9h/objects
```

or
```
npm install @h9h/objects --save
```

## Generators
Create new Objects with certain structures.

### generateFromPathsWithValues

Given an object which holds values under structured keys, resolve to an object-structure.

**Example:**
```
{
    'income.2017': 50000,
    'income.2018': 60000,
    'costs.2017': 12000,
    'costs.2018': 11400,
}
```

becomes

```
{
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
```
