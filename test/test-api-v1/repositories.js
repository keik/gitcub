import test from 'ava'
import axios from 'axios'
import fs from 'fs'
import path from 'path'
import rimraf from 'rimraf'

export default function(config) {
  test.cb('POST /api/v1/:user/repositories/:repo should return 201 when specified name repository does not exist', (t) => {
    axios.post(`http://localhost:${config.PORT}/api/v1/users/user1/repositories`, { name: 'repo2' })
      .then((res) => {
        t.is(res.status, 201)
        t.is(fs.existsSync(path.join(config.REPO_ROOT, 'repo2')), true)
      })
      .catch((err) => {
        t.fail(err.toString())
      })
      .finally(() => {
        rimraf.sync(path.join(config.REPO_ROOT, 'repo2'))
        t.end()
      })
  })

  test.cb('POST /api/v1/users/:user/repositories/:repo should return 409 when specified name repository already exists', (t) => {
    axios.post(`http://localhost:${config.PORT}/api/v1/users/user1/repositories`, { name: 'repo1' })
      .then((res) => {
        t.fail(res.toString())
      })
      .catch((err) => {
        t.is(err.response.status, 409)
      }).finally(t.end)
  })
}
