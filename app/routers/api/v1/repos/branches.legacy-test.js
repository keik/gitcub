// @flow

import axios from 'axios'
import Express from 'express'
import test from 'tape'

import { API_REPOS_BRANCHES } from '../../../../../constants/api'
import branchesRouter from './branches'

let app
let PORT
test.test('setup', t => {
  app = Express()
    .use(branchesRouter)
    .listen(0)
  // $FlowFixMe
  PORT = app.address().port
  t.end()
})

test(`GET ${API_REPOS_BRANCHES} with no param should return branches in default branch`, t => {
  axios
    .get(`http://localhost:${PORT}/api/v1/repos/user1/repo1/branches`)
    .then(res => {
      // console.log(require('util').inspect(res.data, false, null))
      t.deepEqual(
        res.data.sort((a, b) =>
          a.commit.author.date > b.commit.author.date
            ? 1
            : a.commit.author.date < b.commit.author.date
            ? -1
            : 0
        ),
        [
          {
            name: 'feature',
            commit: {
              author: {
                name: 'keik',
                email: 'k4t0.kei@gmail.com',
                date: '2016-09-26T15:08:24.000Z'
              },
              committer: {
                name: 'keik',
                email: 'k4t0.kei@gmail.com',
                date: '2016-09-27T01:08:48.000Z'
              },
              message: 'Add `!` to file2\n',
              parents: [
                {
                  url:
                    'http://localhost:8000/api/v1/repos/undefined/undefined/git/commits/297862f2168af863ae0e2735caabe8b7461f188f',
                  sha: '297862f2168af863ae0e2735caabe8b7461f188f'
                }
              ],
              sha: '2394f21336aec34a5a225f1e8b9039593f1d1e27',
              tree: {
                url:
                  'http://localhost:8000/api/v1/repos/undefined/undefined/git/trees/ec03c563e29b0f50af9e561ad19f9df24dfe7e10',
                sha: 'ec03c563e29b0f50af9e561ad19f9df24dfe7e10'
              },
              url:
                'http://localhost:8000/api/v1/repos/undefined/undefined/git/commits/2394f21336aec34a5a225f1e8b9039593f1d1e27'
            }
          },
          {
            name: 'master',
            commit: {
              author: {
                name: 'keik',
                email: 'k4t0.kei@gmail.com',
                date: '2016-10-24T14:13:53.000Z'
              },
              committer: {
                name: 'keik',
                email: 'k4t0.kei@gmail.com',
                date: '2016-10-24T14:13:53.000Z'
              },
              message: 'Add nested file\n',
              parents: [
                {
                  url:
                    'http://localhost:8000/api/v1/repos/undefined/undefined/git/commits/f1582566910f7a5d41b47f0c93ed560e1e1fd8d0',
                  sha: 'f1582566910f7a5d41b47f0c93ed560e1e1fd8d0'
                }
              ],
              sha: '0100c14d9341db683c43e47c6944ecb1616005bd',
              tree: {
                url:
                  'http://localhost:8000/api/v1/repos/undefined/undefined/git/trees/dfd076cc884b4554bab928f62123fb262c02ec6c',
                sha: 'dfd076cc884b4554bab928f62123fb262c02ec6c'
              },
              url:
                'http://localhost:8000/api/v1/repos/undefined/undefined/git/commits/0100c14d9341db683c43e47c6944ecb1616005bd'
            }
          }
        ].sort((a, b) =>
          a.commit.author.date > b.commit.author.date
            ? 1
            : a.commit.author.date < b.commit.author.date
            ? -1
            : 0
        )
      )
    })
    .catch(err => {
      t.fail(err.toString())
    })
    .then(t.end)
})

test(`GET ${API_REPOS_BRANCHES} from no exists repo should return 404`, t => {
  axios
    .get(`http://localhost:${PORT}/api/v1/repos/no_exists_user/foo/branches`)
    .then(() => {
      t.fail()
    })
    .catch(() => {
      // TODO 404 with global error handler
      t.ok(true)
    })
    .then(t.end)
})

test.test('teardown', t => {
  if (app) app.close()
  t.end()
})
