import test from 'ava'
import promiseFinally from 'promise.prototype.finally'

import app from '../lib/server/app'

import test_blobs from './test-api-v1/blobs'
import test_commits from './test-api-v1/commits'
import test_references from './test-api-v1/references'
import test_repositories from './test-api-v1/repositories'
import test_tags from './test-api-v1/tags'
import test_trees from './test-api-v1/trees'

promiseFinally.shim()

const config = {
  PORT: 3001,
  REPO_ROOT: './fixture/repos',
}

app.set('config', config)

let server
test.before('setup', () => {
  server = app.listen(config.PORT, () => console.log(config.PORT))
})

const tests = [
  test_blobs,
  test_commits,
  test_references,
  test_repositories,
  test_tags,
  test_trees,
]
tests.forEach(t => t(config))

test.after('teardown', () => {
  server.close()
})
