type T = any

type Leaf<T> = {
  name: string,
  value: T
}

type Branch<T> = {
  name: string,
  value?: T,
  children: (Branch<T> | Leaf<T>)[]
}

/**
 * Takes an object of the form
 *
 *  {
 *    'a.b': 1,
 *    'a.b.a': 2,
 *    'a.b.b': 4
 *  }
 *
 * and returns an object of the form
 *
 *  {
 *    name: 'Statistics,
 *    children: [
 *      {
 *        name: 'a',
 *        children: [
 *          {
 *            name: 'b',
 *            value: 1,
 *            children: [
 *              {
 *                name: 'a',
 *                value: 2
 *              },
 *              {
 *                name: 'b',
 *                value: 4
 *              }
 *            ]
 *          }
 *        ]
 *      }
 *    ]
 *  }
 * @param object the input
 * @param options name or sepChar. The sepChar is used, to split the key into segments (a.b => [a, b])
 * @returns {{name: never, children: Array}} result-object
 */
export const generateFromPathsWithValues = (object: { [key: string]: T }, options: ?{ name: ?string, sepChar: ?string }): Branch => {
  const sepChar = options && options.sepChar ? options.sepChar : '.'
  const name = options && options.name ? options.name : 'Statistics'

  const result = {
    name,
    children: []
  }

  Object.keys(object).forEach(key => {
    const path = key.split(sepChar)
    let branch = result
    path.slice(0, -1).forEach(p => {
      if (branch.children.length === 0 ||  branch.children.filter(c => c.name === p).length < 1) {
        const child = {
          name: p,
          children: []
        }
        branch.children.push(child)

        branch = child
      } else {
        branch = branch.children.filter(c => c.name === p)[0]
      }
    })

    const leaf = {
      name: path.slice(-1)[0],
      value: object[key]
    }

    branch.children.push(leaf)
  })

  return result
}
