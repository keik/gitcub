// @flow

import { Router } from 'express'
import fs from 'fs'
import glob from 'glob'
import Git from 'nodegit'
import { join } from 'path'

import asyncWrapper from '../../../../asyncWrapper'
import config from '../../../../../../config.json'
import { API_REPOS } from '../../../../../share/constants/api'

const REPO_ROOT = config.env[process.env.NODE_ENV].REPO_ROOT

export default new Router()
  .post(API_REPOS.LOGIN_USERS, onPost)
  .get(API_REPOS.PUBLIC, onGetPublic)
  .get(API_REPOS.USERS, asyncWrapper(onGetUsers))

function onPost(req: express$Request, res: express$Response) {
  const { name, owner, authenticity_token } = req.body
  if (authenticity_token !== 'TRUE')
    // TODO verify auchenticity token
    return res.status(401).json({
      message: 'Unauthorized'
    })
  if (name == null) {
    res.status(400).end('"name" is requred')
    return
  }

  const repoPath = join(REPO_ROOT, owner, name)
  fs.exists(repoPath, exists => {
    if (exists) {
      res.status(409).end('repositoriy of specified name already exists')
    } else {
      Git.Repository.init(repoPath, 1)
        .then(() => res.status(201).end('new repository was created'))
        .catch(err => {
          console.error(Error(err))
          res.status(503).end('503')
        })
    }
  })
}

async function _getRepos(
  owner = '*'
): Promise<
  Array<{
    full_name: string, // full name of repos like `user1/repo1`,
    name: string, // repo name like `repo1`
    owner: {
      login: string /* user name like `user1` */
    }
  }>
> {
  const filepaths = await new Promise((resolve, reject) => {
    glob(`${REPO_ROOT}/${owner}/*`, (err, filepaths) => {
      if (err) reject(err)
      resolve(filepaths)
    })
  })

  const repoPaths: Array<string> = (await Promise.all(
    filepaths.map(async filepath => {
      const repo = await Git.Repository.openBare(filepath).catch(() => null)
      if (repo != null) return filepath
    })
  )).filter(Boolean)

  return repoPaths.map(repoPath => {
    // repoPath like './test/fixture/repos/user1/repo1' matches as `full_name: user1/repo1, login: user1, name: repo1`
    const [full_name, login, name] = repoPath.match(/([^/]+)\/([^/]+)$/) || {}
    return { full_name, name, owner: { login } }
  })
}

async function onGetPublic(req: express$Request, res: express$Response) {
  const repoNames = await _getRepos()
  res.json(repoNames)
}

async function onGetUsers(req: express$Request, res: express$Response) {
  const { owner } = req.params
  const repoNames = await _getRepos(owner)
  res.json(repoNames)
}
