import test from 'ava'
import axios from 'axios'
import Express from 'express'
import promiseFinally from 'promise.prototype.finally'

import { API_GIT_REFS } from '../../../../../share/constants/api'
import refsRouter from './refs'

promiseFinally.shim()

let app
let PORT
test.before('setup', () => {
  app = new Express()
    .use(refsRouter)
    .listen(0)
  PORT = app.address().port
})

test.cb(`GET ${API_GIT_REFS} with no param should return list of all refs`, (t) => {
  axios.get(`http://localhost:${PORT}/api/v1/repos/user1/repo1/git/refs`)
    .then((res) => {
      // console.log(require('util').inspect(res.data, false, null))
      t.deepEqual(res.data.sort((a, b) => a.ref > b.ref),
        [ { ref: 'refs/heads/feature',
          url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/refs/heads/feature',
          object:
          { type: 'commit',
            sha: '2394f21336aec34a5a225f1e8b9039593f1d1e27',
            url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/commits/2394f21336aec34a5a225f1e8b9039593f1d1e27' } },
          { ref: 'refs/heads/master',
            url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/refs/heads/master',
            object:
            { type: 'commit',
              sha: '0100c14d9341db683c43e47c6944ecb1616005bd',
              url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/commits/0100c14d9341db683c43e47c6944ecb1616005bd' } },
          { ref: 'refs/tags/v1.0.0',
            url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/refs/tags/v1.0.0',
            object:
            { type: 'tag',
              sha: '9e20f2d7bdcc5027cc0a8083f07f32e1a0d1f34d',
              url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/tags/9e20f2d7bdcc5027cc0a8083f07f32e1a0d1f34d' } } ]
          .sort((a, b) => a.ref > b.ref)
      )
    })
    .catch((err) => {
      console.error(err)
      t.fail(err)
    }).finally(t.end)
})

test.cb(`GET ${API_GIT_REFS} with /heads should return list of all branches`, (t) => {
  axios.get(`http://localhost:${PORT}/api/v1/repos/user1/repo1/git/refs/heads`)
    .then((res) => {
      // console.log(require('util').inspect(res.data, false, null))
      t.deepEqual(res.data.sort((a, b) => a.ref > b.ref),
        [ { ref: 'refs/heads/feature',
          url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/refs/heads/feature',
          object:
          { type: 'commit',
            sha: '2394f21336aec34a5a225f1e8b9039593f1d1e27',
            url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/commits/2394f21336aec34a5a225f1e8b9039593f1d1e27' } },
          { ref: 'refs/heads/master',
            url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/refs/heads/master',
            object:
            { type: 'commit',
              sha: '0100c14d9341db683c43e47c6944ecb1616005bd',
              url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/commits/0100c14d9341db683c43e47c6944ecb1616005bd' } } ]
          .sort((a, b) => a.ref > b.ref)
      )
    })
    .catch((err) => {
      console.error(err)
      t.fail(err)
    }).finally(t.end)
})

test.cb(`GET ${API_GIT_REFS} with /tags should return list of all tags`, (t) => {
  axios.get(`http://localhost:${PORT}/api/v1/repos/user1/repo1/git/refs/tags`)
    .then((res) => {
      // console.log(require('util').inspect(res.data, false, null))
      t.deepEqual(res.data.sort((a, b) => a.ref > b.ref),
        [ { ref: 'refs/tags/v1.0.0',
          url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/refs/tags/v1.0.0',
          object:
          { type: 'tag',
            sha: '9e20f2d7bdcc5027cc0a8083f07f32e1a0d1f34d',
            url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/tags/9e20f2d7bdcc5027cc0a8083f07f32e1a0d1f34d' } } ]
      )
    })
    .catch((err) => {
      console.error(err)
      t.fail(err)
    }).finally(t.end)
})

test.cb(`GET ${API_GIT_REFS} with /heads/BRANCH_NAME should return a specified ref`, (t) => {
  axios.get(`http://localhost:${PORT}/api/v1/repos/user1/repo1/git/refs/heads/feature`)
    .then((res) => {
      // console.log(require('util').inspect(res.data, false, null))
      t.deepEqual(res.data,
        { ref: 'refs/heads/feature',
          url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/refs/heads/feature',
          object:
          { type: 'commit',
            sha: '2394f21336aec34a5a225f1e8b9039593f1d1e27',
            url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/commits/2394f21336aec34a5a225f1e8b9039593f1d1e27' } }
      )
    })
    .catch((err) => {
      console.error(err)
      t.fail(err)
    }).finally(t.end)
})

test.cb(`GET ${API_GIT_REFS} with /heads/PARTIAL_BRANCH_NAME should return partial matched refs`, (t) => {
  axios.get(`http://localhost:${PORT}/api/v1/repos/user1/repo1/git/refs/heads/feat`)
    .then((res) => {
      // console.log(require('util').inspect(res.data, false, null))
      t.deepEqual(res.data.sort((a, b) => a.ref > b.ref),
        [ { ref: 'refs/heads/feature',
          url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/refs/heads/feature',
          object:
          { type: 'commit',
            sha: '2394f21336aec34a5a225f1e8b9039593f1d1e27',
            url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/commits/2394f21336aec34a5a225f1e8b9039593f1d1e27' } } ]
          .sort((a, b) => a.ref > b.ref)
      )
    })
    .catch((err) => {
      console.error(err)
      t.fail(err)
    }).finally(t.end)
})

test.cb(`GET ${API_GIT_REFS} with /tags/PARTIAL_TAG_NAME should return partial matched refs`, (t) => {
  axios.get(`http://localhost:${PORT}/api/v1/repos/user1/repo1/git/refs/tags/v1`)
    .then((res) => {
      // console.log(require('util').inspect(res.data, false, null))
      t.deepEqual(res.data.sort((a, b) => a.ref > b.ref),
        [ { ref: 'refs/tags/v1.0.0',
          url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/refs/tags/v1.0.0',
          object:
          { type: 'tag',
            sha: '9e20f2d7bdcc5027cc0a8083f07f32e1a0d1f34d',
            url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/tags/9e20f2d7bdcc5027cc0a8083f07f32e1a0d1f34d' } } ]
          .sort((a, b) => a.ref > b.ref)
      )
    })
    .catch((err) => {
      console.error(err)
      t.fail(err)
    }).finally(t.end)
})

test.cb(`GET ${API_GIT_REFS} with NOT_EXISTS_REF should return 404`, (t) => {
  axios.get(`http://localhost:${PORT}/api/v1/repos/user1/repo1/git/refs/no_exists_ref`)
    .then((res) => {
      t.fail(res)
    })
    .catch((err) => {
      t.is(err.response.status, 404)
    }).finally(t.end)
})

test.cb(`GET ${API_GIT_REFS} from no exists repo should return 404`, (t) => {
  axios.get(`http://localhost:${PORT}/api/v1/repos/no_exists_user/foo/git/refs`)
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
