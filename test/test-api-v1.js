import test from 'ava'
import axios from 'axios'
import fs from 'fs'
import path from 'path'
import promiseFinally from 'promise.prototype.finally'
import rimraf from 'rimraf'

import app from '../lib/server/app'

promiseFinally.shim()

const config = {
  PORT: 3001,
  REPO_ROOT: './fixture/repos'
}

app.set('config', config)

let server
test.before('setup', () => {
  server = app.listen(config.PORT)
})

test.cb('GET /api/v1/repositories/:repoName/commits should return 200 and commits information', t => {
  axios.get(`http://localhost:${config.PORT}/api/v1/repositories/repo1/commits`)
    .then(res => {
      t.deepEqual(res.data, [{id: '3c27dc60c76be4a1f5b765cb141d0d22d871a2b6', date: '2016-09-24 02:48', message: 'Add file2\n'},
                             {id: 'd29e783434a7fadfa5bbf7b361dfc20a83ad8722', date: '2016-09-24 02:48', message: 'Add file1\n'}])
    })
    .catch(err => {
      t.fail(err.toString())
    }).finally(t.end)
})

test.cb('POST /api/v1/repositories should return 201 when specified name repository does not exist', t => {
  axios.post(`http://localhost:${config.PORT}/api/v1/repositories`, {name: 'repo2'})
    .then(res => {
      t.ok(res.status === 201)
      t.ok(fs.existsSync(path.join(config.REPO_ROOT, 'repo2')) === true)
    })
    .catch(err => {
      t.fail(err.toString())
    })
    .finally(() => {
      rimraf.sync(path.join(config.REPO_ROOT, 'repo2'))
      t.end()
    })
})

test.cb('POST /api/v1/repositories should return 409 when specified name repository already exists', t => {
  axios.post(`http://localhost:${config.PORT}/api/v1/repositories`, {name: 'repo1'})
    .then(res => {
      t.fail(res.toString())
    })
    .catch(err => {
      t.ok(err.response.status === 409)
    }).finally(t.end)
})

test.after('teardown', () => {
  server.close()
})
