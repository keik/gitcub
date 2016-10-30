import test from 'ava'

import * as RepositoryActions from '../lib/share/actions/repository-actions'
import repository from '../lib/share/reducers/repository'

test('reducer should ignore action of undefined', (t) => {
  const result = repository(undefined, {})
  t.deepEqual(result,
    { loading: false }
  )
})

test('reducer should handle FETCHING', (t) => {
  const result = repository({},
    { type: RepositoryActions.FETCHING }
  )
  t.deepEqual(result,
    { loading: true }
  )
})

test('reducer should handle FETCH_SUCCESS to merge data', (t) => {
  const result = repository({ a: 0, x: 0 },
    { type: RepositoryActions.FETCH_SUCCESS,
      data:
      [ { a: 1 },
        { b: { c: 2 },
          d: 3 }]
    }
  )
  t.deepEqual(result,
    { a: 1,
      b: { c: 2 },
      d: 3,
      loading: false,
      x: 0
    }
  )
})

test('reducer should handle FETCH_FAILURE', (t) => {
  const result = repository({ a: 0, x: 0 },
    { type: RepositoryActions.FETCH_FAILURE,
      data: 'ignored',
      error: 'reasons' }
  )
  t.deepEqual(result,
    { a: 0,
      error: 'reasons',
      loading: false,
      x: 0 }
  )
})
