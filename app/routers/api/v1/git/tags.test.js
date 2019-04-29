// @flow

import assert from 'assert'
import axios from 'axios'
import Express from 'express'

import { API_GIT_TAGS } from '../../../../../constants/api'
import tagsRouter from './tags'

let app
let PORT
beforeAll(done => {
  app = Express()
    .use(tagsRouter)
    .listen(0)
  // $FlowFixMe
  PORT = app.address().port
  done()
})

test(`GET ${API_GIT_TAGS} with SHA should return a specified commit`, async () => {
  const res = await axios
    .get(`http://localhost:${PORT}/api/v1/repos/user1/repo1/git/tags/aaaaa`)
    .catch(e => e.response)
  assert(res.data === 'Not Implemented')
})

test(`GET ${API_GIT_TAGS} from no exists repo should return 404`, async () => {
  const res = await axios
    .get(
      `http://localhost:${PORT}/api/v1/repos/no_exists_user/foo/git/tags/aaaaa`
    )
    .catch(e => e.response)
  assert(res.data === 'Not Implemented')
})

afterAll(() => {
  if (app) app.close()
})
