import test from 'ava'

import * as RepositoryActions from './repository-actions'

test('fetching should create FETCHING action', (t) => {
  t.deepEqual(RepositoryActions.fetching(),
    { type: RepositoryActions.FETCHING }
  )
})

test('fetchSuccess should create FETCH_SUCCESS action', (t) => {
  t.deepEqual(RepositoryActions.fetchSuccess({foo: 'bar'}),
    { type: RepositoryActions.FETCH_SUCCESS,
      data: { foo: 'bar' } }
  )
})

test('fetchFailure should create FETCH_FAILURE action', (t) => {
  t.deepEqual(RepositoryActions.fetchFailure({err: 'reasons'}),
    { type: RepositoryActions.FETCH_FAILURE,
      error: { err: 'reasons' } }
  )
})
