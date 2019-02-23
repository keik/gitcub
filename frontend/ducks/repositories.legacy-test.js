// @flow

import test from 'tape'

import repository, * as RepositoryActions from './repositories'

test('reducer should handle FETCH to merge data', t => {
  const result = repository(undefined, {
    type: RepositoryActions.FETCH,
    payload: [{ full_name: 'a' }, { full_name: 'b' }]
  })
  t.deepEqual(result, [{ full_name: 'a' }, { full_name: 'b' }])
  t.end()
})
