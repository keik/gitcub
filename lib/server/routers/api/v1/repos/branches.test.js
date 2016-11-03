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
      // console.log(require('util').inspect(res.data, false, null))
      t.deepEqual(res.data.sort((a, b) => a.commit.name > b.commit.name),
        [ { name: 'feature',
          commit:
          { author:
            { name: 'keik',
              email: 'k4t0.kei@gmail.com',
              date: '2016-09-26T15:08:24.000Z' },
            committer:
            { name: 'keik',
              email: 'k4t0.kei@gmail.com',
              date: '2016-09-27T01:08:48.000Z' },
            message: 'Add `!` to file2\n',
            parents:
            [ { url: 'http://localhost:3000/api/v1/repos/undefined/undefined/git/commits/297862f2168af863ae0e2735caabe8b7461f188f',
              sha: '297862f2168af863ae0e2735caabe8b7461f188f' } ],
            sha: '2394f21336aec34a5a225f1e8b9039593f1d1e27',
            tree:
            { url: 'http://localhost:3000/api/v1/repos/undefined/undefined/git/trees/ec03c563e29b0f50af9e561ad19f9df24dfe7e10',
              sha: 'ec03c563e29b0f50af9e561ad19f9df24dfe7e10' },
            url: 'http://localhost:3000/api/v1/repos/undefined/undefined/git/commits/2394f21336aec34a5a225f1e8b9039593f1d1e27' } },
          { name: 'master',
            commit:
            { author:
              { name: 'keik',
                email: 'k4t0.kei@gmail.com',
                date: '2016-10-24T14:13:53.000Z' },
              committer:
              { name: 'keik',
                email: 'k4t0.kei@gmail.com',
                date: '2016-10-24T14:13:53.000Z' },
              message: 'Add nested file\n',
              parents:
              [ { url: 'http://localhost:3000/api/v1/repos/undefined/undefined/git/commits/f1582566910f7a5d41b47f0c93ed560e1e1fd8d0',
                sha: 'f1582566910f7a5d41b47f0c93ed560e1e1fd8d0' } ],
              sha: '0100c14d9341db683c43e47c6944ecb1616005bd',
              tree:
              { url: 'http://localhost:3000/api/v1/repos/undefined/undefined/git/trees/dfd076cc884b4554bab928f62123fb262c02ec6c',
                sha: 'dfd076cc884b4554bab928f62123fb262c02ec6c' },
              url: 'http://localhost:3000/api/v1/repos/undefined/undefined/git/commits/0100c14d9341db683c43e47c6944ecb1616005bd' } } ]
          .sort((a, b) => a.commit.name > b.commit.name)
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
