// @flow

import test from 'tape'
import axios from 'axios'
import Express from 'express'

import { API_GIT_TAGS } from '../../../../../share/constants/api'
import tagsRouter from './tags'

let app
let PORT
test.test('setup', t => {
  app = Express()
    .use(tagsRouter)
    .listen(0)
  PORT = app.address().port
  t.end()
})

test(`GET ${API_GIT_TAGS} with SHA should return a specified commit`, t => {
  axios
    .get(`http://localhost:${PORT}/api/v1/repos/user1/repo1/git/tags/aaaaa`)
    .then(() => {
      t.fail()
    })
    .catch(err => {
      // TODO
      t.is(err.response.data, 'Not Implemented')
    })
    .then(t.end)
})

test(`GET ${API_GIT_TAGS} from no exists repo should return 404`, t => {
  axios
    .get(
      `http://localhost:${PORT}/api/v1/repos/no_exists_user/foo/git/tags/aaaaa`
    )
    .then(() => {
      t.fail()
    })
    .catch(err => {
      // TODO
      t.is(err.response.data, 'Not Implemented')
    })
    .then(t.end)
})

test.test('teardown', t => {
  app.close()
  t.end()
})
