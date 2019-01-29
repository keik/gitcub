// @flow

import { Router } from 'express'
import Git from 'nodegit'
import { join } from 'path'

import { convertCommitToGitCommitObject } from '../converter'
import config from '../../../../../config'
import { API_GIT_COMMITS } from '../../../../../constants/api'

const REPO_ROOT = config.env[process.env.NODE_ENV || 'development'].REPO_ROOT

export default Router().get(API_GIT_COMMITS, (onGet: any))

function onGet(req, res) {
  const { owner, repo, sha } = req.params
  const repoPath = join(REPO_ROOT, owner, repo)
  Git.Repository.openBare(repoPath)
    .then(grepo =>
      grepo
        .getReference(sha)
        .then(ref => ref.target())
        .catch(() => sha)
        .then(sha => grepo.getCommit(sha))
        .then(commit => {
          res.json(convertCommitToGitCommitObject(commit, owner, repo))
        })
        .catch(err => {
          console.error(err)
          res.status(503).end('503')
        })
    )
    .catch(err => {
      console.error(Error(err))
      res.status(404).json({ message: 'Not Found' })
    })
}
