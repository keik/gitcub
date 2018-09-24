// @flow

import test from 'tape'

import repository, * as RepositoryActions from './repository'

test('reducer should ignore action of undefined', t => {
  const result = repository(undefined, {})
  t.deepEqual(result, { loading: false })
  t.end()
})

test('reducer should handle FETCHING', t => {
  const result = repository(null, { type: RepositoryActions.FETCHING })
  t.deepEqual(result, { loading: true })
  t.end()
})

test('reducer should handle FETCH_SUCCESS to merge data', t => {
  const result = repository(
    { loading: false, a: 0, x: 0 },
    {
      type: RepositoryActions.FETCH_SUCCESS,
      data: [
        { a: 1 },
        {
          b: { c: 2 },
          d: 3
        }
      ]
    }
  )
  t.deepEqual(result, {
    a: 1,
    b: { c: 2 },
    d: 3,
    loading: false,
    x: 0
  })
  t.end()
})

test('reducer should handle FETCH_FAILURE', t => {
  const result = repository(
    { loading: false, a: 0, x: 0 },
    {
      type: RepositoryActions.FETCH_FAILURE,
      data: 'ignored',
      error: 'reasons'
    }
  )
  t.deepEqual(result, {
    a: 0,
    error: 'reasons',
    loading: false,
    x: 0
  })
  t.end()
})
