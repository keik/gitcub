// @flow

import { join } from 'path'

import { API_REPOS_COMMITS } from 'app-constants/api'
import { Router } from 'express'
import { merge } from 'lodash'
import Git from 'nodegit'

import config from '../../../../../../config'
import asyncWrapper from '../../../../asyncWrapper'
import { genAPIStr } from '../../../../shared/utils'
import { convertCommitToReposCommitObject } from '../converter'

const REPO_ROOT = config.env[process.env.NODE_ENV || 'development'].REPO_ROOT

export default new Router().get(API_REPOS_COMMITS, asyncWrapper(onGet))

async function onGet(req, res) {
  const { sha } = req.params
  if (sha) {
    await _getOneCommit(req, res)
  } else {
    await _getCommits(req, res)
  }
}

async function _getOneCommit(req, res) {
  const { owner, repo: repoName, sha } = req.params
  const repoPath = join(REPO_ROOT, owner, repoName)

  const repo = await Git.Repository.open(repoPath)
  let oid
  try {
    const ref = await repo.getReference(sha)
    oid = ref.target()
  } catch (e) {
    oid = sha
  }

  const commit = await repo.getCommit(oid)
  const reposCommitObj = await _foldCommitToObj(commit)
  res.json(reposCommitObj)

  async function _foldCommitToObj(commit) {
    // single commit with patches
    const reposCommitObj = convertCommitToReposCommitObject(
      commit,
      owner,
      repoName
    )
    const files = []
    const stats = {
      total: 0,
      additions: 0,
      deletions: 0
    }
    const diffs = await commit.getDiff()
    await Promise.all(
      diffs.map(async diff => {
        const patches = await diff.patches()
        return await Promise.all(
          patches.map(async patch => {
            const newFile = patch.newFile()
            const oldFile = patch.oldFile()
            const filename = newFile.path()
            const status = patch.status()
            const filesha =
              status === Git.Diff.DELTA.DELETED
                ? oldFile.id().tostrS()
                : newFile.id().tostrS()
            const commitsha =
              status === Git.Diff.DELTA.DELETED
                ? reposCommitObj.parents[0] && reposCommitObj.parents[0].sha
                : sha
            const {
              total_additions: additions,
              total_deletions: deletions
            } = patch.lineStats()
            const hunks = await patch.hunks()
            return Promise.all(
              hunks.map(async hunk => {
                const lines = await hunk.lines()
                const patchText =
                  hunk.header() +
                  lines
                    .map(
                      line =>
                        String.fromCharCode(line.origin()) + line.content()
                    )
                    .join('')
                    .replace(/\n$/, '')
                const file = {
                  sha: filesha,
                  filename,
                  status: convertPatchStatus(status),
                  additions,
                  deletions,
                  changes: additions + deletions,
                  blob_url: genAPIStr('/:owner/:repo}/blob/:sha/:path', {
                    owner,
                    repo: repoName,
                    sha: commitsha,
                    path: filename
                  }),
                  raw_url: genAPIStr('/:owner/:repo/raw/:sha/:path', {
                    owner,
                    repo: repoName,
                    sha: commitsha,
                    path: filename
                  }),
                  contents_url: genAPIStr(
                    '/repos/:owner/:repo/contents/:path}?ref=:sha',
                    {
                      owner,
                      repo: repoName,
                      sha: commitsha,
                      path: filename
                    }
                  ),
                  patch: patchText,
                  previous_filename:
                    status === Git.Diff.DELTA.RENAMED
                      ? patch.oldFile().path()
                      : undefined
                }

                if (files.some(f => f.filename === filename)) {
                  ;(files.find(f => f.filename === filename): any).patch +=
                    '\n' + patchText
                } else {
                  files.push(file)
                  stats.total += additions + deletions
                  stats.additions += additions
                  stats.deletions += deletions
                }
              })
            )
          })
        )
      })
    )
    return merge(reposCommitObj, { files, stats })
  }
}

async function _getCommits(req, res) {
  const { owner, repo: repoName } = req.params
  const { sha = 'master' } = req.query
  const repoPath = join(REPO_ROOT, owner, repoName)
  const repo = await Git.Repository.open(repoPath)
  let oid
  try {
    const ref = await repo.getReference(sha)
    oid = ref.target()
  } catch (e) {
    oid = sha
  }
  const commit = await repo.getCommit(oid)
  try {
    const commits = await _collectHistory(commit)
    res.json(
      commits.map(commit =>
        convertCommitToReposCommitObject(commit, owner, repoName)
      )
    )
  } catch (e) {
    res.status(404).json({ message: 'Commits Not Found' })
  }

  async function _collectHistory(commit) {
    return new Promise((resolve, reject) => {
      commit
        .history()
        .on('end', resolve)
        .on('error', reject)
        .start()
    })
  }
}

function convertPatchStatus(status) {
  switch (status) {
    case Git.Diff.DELTA.ADDED:
      return 'added'
    case Git.Diff.DELTA.DELETED:
      return 'removed'
    case Git.Diff.DELTA.MODIFIED:
      return 'modified'
    case Git.Diff.DELTA.RENAMED:
      return 'renamed'
    case Git.Diff.DELTA.COPIED:
      return 'copied'
    default:
      return 'unknown'
  }
}
