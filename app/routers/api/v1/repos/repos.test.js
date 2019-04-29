// @flow

import assert from 'assert'
import fs from 'fs'
import path from 'path'

import axios from 'axios'
import bodyParser from 'body-parser'
import Express from 'express'
import rimraf from 'rimraf'

import config from '../../../../../config'
import { API_REPOS } from '../../../../../constants/api'
import reposRouter from './repos'

const REPO_ROOT = config.env[process.env.NODE_ENV || 'development'].REPO_ROOT

let app
let PORT
beforeAll(done => {
  app = Express()
    .use(bodyParser.json())
    .use(reposRouter)
    .listen(0)
  // $FlowFixMe
  PORT = app.address().port
  done()
})

test(`POST ${
  API_REPOS.LOGIN_USERS
} should return 201 when specified name repository does not exist`, async () => {
  const res = await axios.post(
    `http://localhost:${PORT}${API_REPOS.LOGIN_USERS}`,
    {
      name: 'repo2',
      owner: 'DUMMY',
      authenticity_token: 'TRUE'
    }
  )
  assert(res.status === 201)
  assert(fs.existsSync(path.join(REPO_ROOT, 'DUMMY', 'repo2')))
  rimraf.sync(path.join(REPO_ROOT, 'DUMMY'))
})

test(`POST ${
  API_REPOS.LOGIN_USERS
} should return 409 when specified name repository already exists`, async () => {
  const res = await axios
    .post(`http://localhost:${PORT}${API_REPOS.LOGIN_USERS}`, {
      name: 'repo1',
      owner: 'user1',
      authenticity_token: 'TRUE'
    })
    .catch(e => e.response)
  assert(res.status === 409)
})

test(`GET ${
  API_REPOS.PUBLIC
} should return list of all public repositories`, async () => {
  const res = await axios.get(`http://localhost:${PORT}${API_REPOS.PUBLIC}`)
  const result = res.data.filter(r => r.name !== 'repo2')
  // console.log(require('util').inspect(result, false, null))
  assert.deepEqual(result, [
    {
      owner: { login: 'user1' },
      name: 'repo1',
      full_name: 'user1/repo1'
    }
  ])
})

test(`GET ${
  API_REPOS.USERS
} should return list of all specified user's repositories`, async () => {
  const res = await axios.get(
    `http://localhost:${PORT}/api/v1/users/user1/repos`
  )
  const result = res.data.filter(r => r.name !== 'repo2')
  // console.log(require('util').inspect(result, false, null))
  assert.deepEqual(result, [
    {
      owner: { login: 'user1' },
      name: 'repo1',
      full_name: 'user1/repo1'
    }
  ])
})

test(`GET ${
  API_REPOS.USERS
} from users which have no repository should return empty list`, async () => {
  const res = await axios.get(
    `http://localhost:${PORT}/api/v1/users/no_exists_user/repos`
  )
  // console.log(require('util').inspect(res.data, false, null))
  assert.deepEqual(res.data, [])
})

afterAll(() => {
  if (app) app.close()
})
