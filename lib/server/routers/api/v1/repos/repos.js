import { Router } from 'express'
import fs from 'fs'
import Git from 'nodegit'
import { join } from 'path'

import config from '../../../../../../config.json'
import { API_REPOS } from '../../../../../share/constants/api'

const REPO_ROOT = config.env[process.env.NODE_ENV].REPO_ROOT

export default new Router()
  .post(API_REPOS, onPost)

function onPost(req, res) {
  const { name, __owner } = req.body  // TODO unparameterize __owner retrieving authorization
  if (name == null) {
    res.status(400).end('"name" is requred')
    return
  }

  const repoPath = join(REPO_ROOT, __owner, name)
  fs.exists(repoPath, (exists) => {
    if (exists) {
      res.status(409).end('repositoriy of specified name already exists')
    } else {
      Git.Repository.init(repoPath, 1)
        .then((repo) => res.status(201).end('new repository was created'))
        .catch((err) => {
          console.err(Error(err))
          res.status(503).end('503')
        })
    }
  })
}
