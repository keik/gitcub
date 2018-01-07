import { Router } from 'express'
import fs from 'fs'
import glob from 'glob'
import Git from 'nodegit'
import { join } from 'path'

import config from '../../../../../../config.json'
import { API_REPOS } from '../../../../../share/constants/api'

const REPO_ROOT = config.env[process.env.NODE_ENV].REPO_ROOT

export default new Router()
  .post(API_REPOS.LOGIN_USERS, onPost)
  .get(API_REPOS.PUBLIC, onGetPublic)
  .get(API_REPOS.USERS, onGetUsers)

function onPost(req, res) {
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
        .then(repo => res.status(201).end('new repository was created'))
        .catch(err => {
          console.err(Error(err))
          res.status(503).end('503')
        })
    }
  })
}

function _getRepos(owner = '*') {
  return new Promise((resolve, reject) => {
    glob(`${REPO_ROOT}/${owner}/*`, (err, files) => {
      if (err) {
        console.error(Error(err))
        reject(err)
      }
      resolve(files)
    })
  }).then(files => {
    return Promise.all(
      files.map(file =>
        Git.Repository.openBare(file)
          .then(repo => file.match(/([^\/]+)\/([^\/]+)$/))
          .catch(err => null)
      )
    ).then(repoNames => {
      return repoNames.filter(Boolean).map(repoName => {
        const [full_name, login, name] = repoName
        return {
          // TODO retrieve from own database
          owner: {
            login
          },
          name,
          full_name
        }
      })
    })
  })
}

function onGetPublic(req, res) {
  _getRepos()
    .then(repoNames => {
      res.json(repoNames)
    })
    .catch(err => {
      console.error(Error(err))
      res.status(503).end('503')
    })
}

function onGetUsers(req, res) {
  const { owner } = req.params
  _getRepos(owner)
    .then(repoNames => {
      res.json(repoNames)
    })
    .catch(err => {
      console.error(Error(err))
      res.status(503).end('503')
    })
}
