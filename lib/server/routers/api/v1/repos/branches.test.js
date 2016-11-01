import test           from 'ava'
import axios          from 'axios'
import Express        from 'express'
import promiseFinally from 'promise.prototype.finally'

import branchesRouter         from './branches'
import { API_REPOS_BRANCHES } from '../../../../../share/constants/api'


promiseFinally.shim()
process.chdir('../../../../../../')

let app
let PORT
test.before('setup', () => {
  app = new Express()
    .use(branchesRouter)
    .listen(0)
  PORT = app.address().port
})

test.cb(`GET ${API_REPOS_BRANCHES} with no param should return branches in default branch`, (t) => {
  axios.get(`http://localhost:${PORT}/api/v1/repos/user1/repo1/branches`)
    .then((res) => {
      console.log(require('util').inspect(res.data, false, null))
      t.deepEqual(res.data.sort(),
        [ { name: 'feature',
          commit:
            { sha: '2394f21336aec34a5a225f1e8b9039593f1d1e27',
              url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/commits/2394f21336aec34a5a225f1e8b9039593f1d1e27' } },
          { name: 'master',
            commit:
              { sha: '0100c14d9341db683c43e47c6944ecb1616005bd',
                url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/commits/0100c14d9341db683c43e47c6944ecb1616005bd' } } ]
      )
    })
    .catch((err) => {
      t.fail(err.toString())
    }).finally(t.end)
})

test.cb(`GET ${API_REPOS_BRANCHES} from no exists repo should return 404`, (t) => {
  axios.get(`http://localhost:${PORT}/api/v1/repos/no_exists_user/foo/branches`)
    .then((res) => {
      t.fail(res)
    })
    .catch((err) => {
      t.is(err.response.status, 404)
    }).finally(t.end)
})

test.after('teardown', () => {
  app.close()
})
