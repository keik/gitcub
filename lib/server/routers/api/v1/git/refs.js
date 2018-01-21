// @flow

import { Router } from 'express'
import Git from 'nodegit'
import { join } from 'path'

import {
  API_GIT_COMMITS,
  API_GIT_REFS,
  API_GIT_TAGS
} from '../../../../../share/constants/api'
import { genAPIStr } from '../../../../../share/utils'
import config from '../../../../../../config.json'

const REPO_ROOT = config.env[process.env.NODE_ENV].REPO_ROOT

export default Router().get(API_GIT_REFS, (onGet: any))

function onGet(req, res) {
  const { params: { owner, repo, '0': pref } } = req
  const repoPath = join(REPO_ROOT, owner, repo)
  function _convertRefToObj(ref) {
    return {
      ref: ref.name(),
      url: genAPIStr(API_GIT_REFS, {
        owner,
        repo,
        '*': ref.name().replace(/^refs\//, '')
      }),
      object: {
        type: ref.isTag() ? 'tag' : 'commit',
        sha: ref.target().tostrS(),
        url: genAPIStr(ref.isTag() ? API_GIT_TAGS : API_GIT_COMMITS, {
          owner,
          repo,
          sha: ref.target().tostrS()
        })
      }
    }
  }

  Git.Repository.openBare(repoPath)
    .then(repo => {
      return repo.getReferences(Git.Reference.TYPE.LISTALL).then(refs => {
        // perfect match
        const matchRefs = refs.filter(
          ref => ref.name().replace(/^refs\//, '') === pref
        )
        if (matchRefs.length === 1) {
          const matchRef = matchRefs[0]
          return res.json(_convertRefToObj(matchRef))
        }

        // partial match
        const partialMatchRefs = refs.filter(ref =>
          RegExp(`^${pref}`).test(ref.name().replace(/^refs\//, ''))
        )
        if (partialMatchRefs.length > 0) {
          res.json(partialMatchRefs.map(_convertRefToObj))
        } else {
          res.status(404).json({ message: 'Not Found' })
        }
      })
    })
    .catch(err => {
      console.error(Error(err))
      res.status(404).json({ message: 'Not Found' })
    })
}
