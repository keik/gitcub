// @flow

import assert from 'assert'

import repository, * as RepositoryActions from './repositories'

test('reducer should handle FETCH to merge data', () => {
  const result = repository(undefined, {
    type: RepositoryActions.FETCH,
    payload: [{ full_name: 'a' }, { full_name: 'b' }]
  })
  assert.deepEqual(result, [{ full_name: 'a' }, { full_name: 'b' }])
})
