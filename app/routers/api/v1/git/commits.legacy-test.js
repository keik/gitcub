// @flow

import axios from 'axios'
import Express from 'express'
import test from 'tape'

import { API_GIT_COMMITS } from '../../../../../constants/api'
import commitsRouter from './commits'

let app
let PORT
test.test('setup', t => {
  app = Express()
    .use(commitsRouter)
    .listen(0)
  // $FlowFixMe
  PORT = app.address().port
  t.end()
})

test(`GET ${API_GIT_COMMITS} with SHA should return a specified commit`, t => {
  axios
    .get(
      `http://localhost:${PORT}/api/v1/repos/user1/repo1/git/commits/0100c14d9341db683c43e47c6944ecb1616005bd`
    )
    .then(res => {
      // console.log(require('util').inspect(res.data, false, null))
      t.deepEqual(res.data, {
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
              'http://localhost:8000/api/v1/repos/user1/repo1/git/commits/f1582566910f7a5d41b47f0c93ed560e1e1fd8d0',
            sha: 'f1582566910f7a5d41b47f0c93ed560e1e1fd8d0'
          }
        ],
        sha: '0100c14d9341db683c43e47c6944ecb1616005bd',
        tree: {
          url:
            'http://localhost:8000/api/v1/repos/user1/repo1/git/trees/dfd076cc884b4554bab928f62123fb262c02ec6c',
          sha: 'dfd076cc884b4554bab928f62123fb262c02ec6c'
        },
        url:
          'http://localhost:8000/api/v1/repos/user1/repo1/git/commits/0100c14d9341db683c43e47c6944ecb1616005bd'
      })
    })
    .catch(err => {
      console.error(err)
      t.fail(err.toString())
    })
    .then(t.end)
})

test(`GET ${API_GIT_COMMITS} from no exists repo should return 404`, t => {
  axios
    .get(
      `http://localhost:${PORT}/api/v1/repos/no_exists_user/foo/git/commits/0100c14d9341db683c43e47c6944ecb1616005bd`
    )
    .then(() => {
      t.fail()
    })
    .catch(err => {
      t.is(err.response.status, 404)
    })
    .then(t.end)
})

test.test('teardown', t => {
  if (app) app.close()
  t.end()
})
