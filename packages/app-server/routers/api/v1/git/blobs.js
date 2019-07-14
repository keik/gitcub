// @flow

import { join } from 'path'

import { API_GIT_BLOBS } from '@gitcub/constants/api'
import { Router } from 'express'
import Git from 'nodegit'

import config from '../../../../../../config'

const REPO_ROOT = config.env[process.env.NODE_ENV || 'development'].REPO_ROOT

export default new Router().get(API_GIT_BLOBS, (onGet: any))

function onGet(req, res) {
  const {
    params: { owner, repo, sha }
  } = req
  const path = req.params[0].replace(/^\//, '')
  const repoPath = join(REPO_ROOT, owner, repo)
  Git.Repository.openBare(repoPath)
    .then(repo =>
      (path
        ? () =>
            repo
              .getReference(sha)
              .then(ref => ref.target())
              .catch(() => sha)
              .then(sha => repo.getCommit(sha))
              .then(commit => commit.getEntry(path))
              .then(entry => entry.getBlob())
        : () => repo.getBlob(sha))()
        .then(blob => {
          const content = blob.toString()
          res.json({
            bytes: blob.rawsize(),
            content,
            lines: content.match(/\n/g).length,
            sha: blob.id().tostrS()
          })
        })
        .catch(err => {
          console.error(Error(err))
          res.status(503).end('503')
        })
    )
    .catch(err => {
      console.error(Error(err))
      res.status(404).json({ message: 'Not Found' })
    })
}
