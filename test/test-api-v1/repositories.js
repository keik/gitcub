import test from 'ava'
import axios from 'axios'
import fs from 'fs'
import path from 'path'
import rimraf from 'rimraf'

import { API_REPOS } from '../../lib/server/routers/api/v1'

export default function(config) {
  test.cb(`POST ${API_REPOS} should return 201 when specified name repository does not exist`, (t) => {
    axios.post(`http://localhost:${config.PORT}${API_REPOS}`, { name: 'repo2', __owner: 'DUMMY' })
      .then((res) => {
        t.is(res.status, 201)
        t.is(fs.existsSync(path.join(config.REPO_ROOT, 'DUMMY', 'repo2')), true)
      })
      .catch((err) => {
        t.fail(err.toString())
      })
      .finally(() => {
        rimraf.sync(path.join(config.REPO_ROOT, 'DUMMY', 'repo2'))
        t.end()
      })
  })

  test.cb(`POST ${API_REPOS} should return 409 when specified name repository already exists`, (t) => {
    axios.post(`http://localhost:${config.PORT}${API_REPOS}`, { name: 'repo1', __owner: 'user1' })
      .then((res) => {
        t.fail(res.toString())
      })
      .catch((err) => {
        t.is(err.response.status, 409)
      }).finally(t.end)
  })
}
