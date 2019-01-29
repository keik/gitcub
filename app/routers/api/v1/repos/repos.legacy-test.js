// @flow

import test from 'tape'
import axios from 'axios'
import bodyParser from 'body-parser'
import Express from 'express'
import fs from 'fs'
import path from 'path'
import rimraf from 'rimraf'

import { API_REPOS } from '../../../../../constants/api'
import reposRouter from './repos'
import config from '../../../../../config'

const REPO_ROOT = config.env[process.env.NODE_ENV || 'development'].REPO_ROOT

let app
let PORT
test.test('setup', t => {
  app = Express()
    .use(bodyParser.json())
    .use(reposRouter)
    .listen(0)
  // $FlowFixMe
  PORT = app.address().port
  t.end()
})

test(`POST ${
  API_REPOS.LOGIN_USERS
} should return 201 when specified name repository does not exist`, t => {
  axios
    .post(`http://localhost:${PORT}${API_REPOS.LOGIN_USERS}`, {
      name: 'repo2',
      owner: 'DUMMY',
      authenticity_token: 'TRUE'
    })
    .then(res => {
      t.is(res.status, 201)
      t.is(fs.existsSync(path.join(REPO_ROOT, 'DUMMY', 'repo2')), true)
    })
    .catch(err => {
      console.error(err)
      t.fail(err.toString())
    })
    .then(() => {
      rimraf.sync(path.join(REPO_ROOT, 'DUMMY'))
      t.end()
    })
})

test(`POST ${
  API_REPOS.LOGIN_USERS
} should return 409 when specified name repository already exists`, t => {
  axios
    .post(`http://localhost:${PORT}${API_REPOS.LOGIN_USERS}`, {
      name: 'repo1',
      owner: 'user1',
      authenticity_token: 'TRUE'
    })
    .then(res => {
      t.fail(res.toString())
    })
    .catch(err => {
      t.is(err.response.status, 409)
    })
    .then(t.end)
})

test(`GET ${
  API_REPOS.PUBLIC
} should return list of all public repositories`, t => {
  axios
    .get(`http://localhost:${PORT}${API_REPOS.PUBLIC}`)
    .then(res => {
      const result = res.data.filter(r => r.name !== 'repo2')
      // console.log(require('util').inspect(result, false, null))
      t.deepEqual(result, [
        {
          owner: { login: 'user1' },
          name: 'repo1',
          full_name: 'user1/repo1'
        }
      ])
    })
    .catch(err => {
      console.error(err)
      t.fail(err.toString())
    })
    .then(t.end)
})

test(`GET ${
  API_REPOS.USERS
} should return list of all specified user's repositories`, t => {
  axios
    .get(`http://localhost:${PORT}/api/v1/users/user1/repos`)
    .then(res => {
      const result = res.data.filter(r => r.name !== 'repo2')
      // console.log(require('util').inspect(result, false, null))
      t.deepEqual(result, [
        {
          owner: { login: 'user1' },
          name: 'repo1',
          full_name: 'user1/repo1'
        }
      ])
    })
    .catch(err => {
      console.error(err)
      t.fail(err.toString())
    })
    .then(t.end)
})

test(`GET ${
  API_REPOS.USERS
} from users which have no repository should return empty list`, t => {
  axios
    .get(`http://localhost:${PORT}/api/v1/users/no_exists_user/repos`)
    .then(res => {
      // console.log(require('util').inspect(res.data, false, null))
      t.deepEqual(res.data, [])
    })
    .catch(err => {
      console.error(err)
      t.fail(err.toString())
    })
    .then(t.end)
})

test.test('teardown', t => {
  if (app) app.close()
  t.end()
})
