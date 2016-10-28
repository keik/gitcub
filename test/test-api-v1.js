import test from 'ava'
import promiseFinally from 'promise.prototype.finally'

import app from '../lib/server/app'

// TODO redesign
import test_branches from './test-api-v1/branches'
import test_tags from './test-api-v1/tags'

// Git
import test_git_blobs from './test-api-v1/git-blobs'
import test_git_commits from './test-api-v1/git-commits'
import test_git_repositories from './test-api-v1/git-repositories'
import test_git_trees from './test-api-v1/git-trees'

// Repository
import test_repos_commits from './test-api-v1/repos-commits'
import test_repos_contents from './test-api-v1/repos-contents'

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
  test_branches,
  test_tags,
  test_git_blobs,
  test_git_commits,
  test_git_repositories,
  test_git_trees,
  test_repos_commits,
  test_repos_contents,
]
tests.forEach(t => t(config))

test.after('teardown', () => {
  server.close()
})
