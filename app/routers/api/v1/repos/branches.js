// @flow

import { join } from 'path'

import { Router } from 'express'
import Git from 'nodegit'

import config from '../../../../../config'
import { API_REPOS_BRANCHES } from '../../../../../constants/api'
import asyncWrapper from '../../../../asyncWrapper'
import { convertCommitToGitCommitObject } from '../converter'

const REPO_ROOT = config.env[process.env.NODE_ENV || 'development'].REPO_ROOT

export default new Router().get(API_REPOS_BRANCHES, asyncWrapper(onGet))

async function onGet(req: express$Request, res: express$Response) {
  const { owner, repo: repoName } = req.params
  const repo = await Git.Repository.openBare(join(REPO_ROOT, owner, repoName))
  const refs = await repo.getReferences(Git.Reference.TYPE.LISTALL)
  const branches = await Promise.all(
    refs
      .filter(ref => ref.isBranch())
      .map(async ref => {
        const commit = await repo.getReferenceCommit(ref)
        return {
          name: ref.shorthand(),
          commit: convertCommitToGitCommitObject(
            commit,
            (undefined: any),
            (undefined: any)
          )
        }
      })
  )
  return res.json(branches)
}
