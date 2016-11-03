import { Router } from 'express'
import Git from 'nodegit'
import { join } from 'path'

import { convertCommitToGitCommitObject } from '../converter'
import { API_REPOS_BRANCHES } from '../../../../../share/constants/api'
import config                 from '../../../../../../config.json'

const REPO_ROOT = config.env[process.env.NODE_ENV].REPO_ROOT

export default new Router()
  .get(API_REPOS_BRANCHES, onGet)

function onGet(req, res) {
  const { owner, repo } = req.params
  Git.Repository.openBare(join(REPO_ROOT, owner, repo))
    .then(grepo =>
      grepo.getReferences(Git.Reference.TYPE.LISTALL)
      .then(refs =>
        Promise.all(
          refs
            .filter(ref => ref.isBranch())
            .map(ref => grepo.getReferenceCommit(ref)
              .then(commit => ({
                name: ref.shorthand(),
                commit: convertCommitToGitCommitObject(commit),
              }))
            )
        )
        .then(branches => res.json(branches))
        .catch(err => {
          console.error(Error(err))
          res.status(503).end('503')
        })
      )
    )
    .catch((err) => {
      console.error(Error(err))
      res.status(404).json({message: 'Not Found'})
    })
}
