// @flow

import test from 'tape'
import axios from 'axios'
import Express from 'express'
import promiseFinally from 'promise.prototype.finally'

import { API_GIT_BLOBS } from '../../../../../share/constants/api'
import blobsRouter from './blobs'

promiseFinally.shim()

let app
let PORT
test.test('setup', t => {
  app = Express()
    .use(blobsRouter)
    .listen(0)
  PORT = app.address().port
  t.end()
})

test(`GET ${API_GIT_BLOBS} with no parameter should return 404`, t => {
  ;(axios
    .get(`http://localhost:${PORT}/api/v1/repos/user1/repo1/git/blobs`)
    .then(() => {
      t.fail()
    })
    .catch(err => {
      t.is(err.response.status, 404)
    }): any).finally(t.end)
})

test(`GET ${API_GIT_BLOBS} with SHA should return file info`, t => {
  ;(axios
    .get(
      `http://localhost:${PORT}/api/v1/repos/user1/repo1/git/blobs/b97038f29f6d581aa86d6417f9ed464c1cdfeba2`
    )
    .then(res => {
      t.deepEqual(res.data, {
        bytes: 18,
        content: "puts 'Hello Ruby'\n",
        lines: 1,
        sha: 'b97038f29f6d581aa86d6417f9ed464c1cdfeba2'
      })
    })
    .catch(err => {
      console.error(err)
      t.fail(err.toString())
    }): any).finally(t.end)
})

test(`GET ${API_GIT_BLOBS} with REFERENCE/PATH should return file info`, t => {
  ;(axios
    .get(
      `http://localhost:${PORT}/api/v1/repos/user1/repo1/git/blobs/master/file1`
    )
    .then(res => {
      t.deepEqual(res.data, {
        bytes: 6,
        content: 'hello\n',
        lines: 1,
        sha: 'ce013625030ba8dba906f756967f9e9ca394464a'
      })
    })
    .catch(err => {
      console.error(err)
      t.fail(err.toString())
    }): any).finally(t.end)
})

test(`GET ${API_GIT_BLOBS} with REFERENCE/NESTED_PATH should return file info`, t => {
  ;(axios
    .get(
      `http://localhost:${PORT}/api/v1/repos/user1/repo1/git/blobs/master/d/dd/nested`
    )
    .then(res => {
      t.deepEqual(res.data, {
        bytes: 8,
        content: 'in deep\n',
        lines: 1,
        sha: '319b14e6a0dfee9ed07d56a90d40ff852ec63672'
      })
    })
    .catch(err => {
      console.error(err)
      t.fail(err.toString())
    }): any).finally(t.end)
})

test(`GET ${API_GIT_BLOBS} with SHA/PATH should return file info`, t => {
  ;(axios
    .get(
      `http://localhost:${PORT}/api/v1/repos/user1/repo1/git/blobs/f1582566910f7a5d41b47f0c93ed560e1e1fd8d0/file1`
    )
    .then(res => {
      t.deepEqual(res.data, {
        bytes: 6,
        content: 'hello\n',
        lines: 1,
        sha: 'ce013625030ba8dba906f756967f9e9ca394464a'
      })
    })
    .catch(err => {
      console.error(err)
      t.fail(err.toString())
    }): any).finally(t.end)
})

test(`GET ${API_GIT_BLOBS} from no exists repo should return 404`, t => {
  ;(axios
    .get(
      `http://localhost:${PORT}/api/v1/repos/no_exists_user/foo/git/blobs/b97038f29f6d581aa86d6417f9ed464c1cdfeba2`
    )
    .then(() => {
      t.fail()
    })
    .catch(err => {
      t.is(err.response.status, 404)
    }): any).finally(t.end)
})

test.test('teardown', t => {
  app.close()
  t.end()
})
