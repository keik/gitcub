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
  REPO_ROOT: './fixture/repos',
}

app.set('config', config)

let server
test.before('setup', () => {
  server = app.listen(config.PORT, () => console.log(config.PORT))
})

test.cb('POST /api/v1/:user/repositories/:repo should return 201 when specified name repository does not exist', (t) => {
  axios.post(`http://localhost:${config.PORT}/api/v1/users/user1/repositories`, { name: 'repo2' })
    .then((res) => {
      t.ok(res.status === 201)
      t.ok(fs.existsSync(path.join(config.REPO_ROOT, 'repo2')) === true)
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
      t.ok(err.response.status === 409)
    }).finally(t.end)
})

test.cb('GET /api/v1/users/:user/repositories/:repo/branches should return 200 and name of branches', (t) => {
  axios.get(`http://localhost:${config.PORT}/api/v1/users/user1/repositories/repo1/branches`)
    .then((res) => {
      t.deepEqual(res.data.sort(), ['master', 'feature'].sort())
    }).catch((err) => {
      t.fail(err.toString())
    }).finally(t.end)
})

test.cb('GET /api/v1/users/:user/repositories/:repo/commits should return 200 and commits information', (t) => {
  axios.get(`http://localhost:${config.PORT}/api/v1/users/user1/repositories/repo1/commits`)
    .then((res) => {
      t.deepEqual(res.data, [
        { id: 'f1582566910f7a5d41b47f0c93ed560e1e1fd8d0', date: '2016-09-27T02:42:37.000Z', message: 'Add codes\n' },
        { id: '9e20f2d7bdcc5027cc0a8083f07f32e1a0d1f34d', date: '2016-09-27T02:40:41.000Z', message: 'Merge branch \'feature\'\n' },
        { id: '2394f21336aec34a5a225f1e8b9039593f1d1e27', date: '2016-09-27T01:08:48.000Z', message: 'Add `!` to file2\n' },
        { id: '297862f2168af863ae0e2735caabe8b7461f188f', date: '2016-09-27T01:08:08.000Z', message: 'Add file3\n' },
        { id: 'e801527fecc2efb3a2e710a21a226ca0abf9db63', date: '2016-09-25T04:15:47.000Z', message: 'Add d/file3\n' },
        { id: '3c27dc60c76be4a1f5b765cb141d0d22d871a2b6', date: '2016-09-24T05:48:36.000Z', message: 'Add file2\n' },
        { id: 'd29e783434a7fadfa5bbf7b361dfc20a83ad8722', date: '2016-09-24T05:48:16.000Z', message: 'Add file1\n' },
      ])
    })
    .catch((err) => {
      t.fail(err.toString())
    }).finally(t.end)
})

test.cb('GET /api/v1/users/:user/repositories/:repo/entries should return 200 and name of entries', (t) => {
  axios.get(`http://localhost:${config.PORT}/api/v1/users/user1/repositories/repo1/entries`)
    .then((res) => {
      t.deepEqual(res.data.map(d => d.path).sort(), ['codes/file.js', 'codes/file.md', 'codes/file.rb', 'd/file3', 'file1', 'file2', 'file3'].sort())
    }).catch((err) => {
      t.fail(err.toString())
    }).finally(t.end)
})

test.cb('GET /api/v1/users/:user/repositories/:repo/entries?branch=<branch_name> should return 200 and name of entries in specified branch', (t) => {
  axios.get(`http://localhost:${config.PORT}/api/v1/users/user1/repositories/repo1/entries?branch=feature`)
    .then((res) => {
      t.deepEqual(res.data.map(d => d.path).sort(), ['d/file3', 'file1', 'file2', 'file3'].sort())
    }).catch((err) => {
      t.fail(err.toString())
    }).finally(t.end)
})

test.cb('GET /api/v1/users/:user/repositories/:repo/tags should return 200 and name of tags', (t) => {
  axios.get(`http://localhost:${config.PORT}/api/v1/users/user1/repositories/repo1/tags`)
    .then((res) => {
      t.deepEqual(res.data, ['v1.0.0'])
    }).catch((err) => {
      t.fail(err.toString())
    }).finally(t.end)
})

test.after('teardown', () => {
  server.close()
})
