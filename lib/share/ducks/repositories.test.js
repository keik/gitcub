// @flow

import test from 'tape'

import repository, * as RepositoryActions from './repositories'

test('reducer should handle FETCH to merge data', t => {
  const result = repository(undefined, {
    type: RepositoryActions.FETCH,
    payload: {
      repositories: [
        { a: 1 },
        {
          b: { c: 2 }
        }
      ]
    }
  })
  t.deepEqual(result, {
    repositories: [{ a: 1 }, { b: { c: 2 } }]
  })
  t.end()
})
