import { Router } from 'express'
import { merge } from 'lodash'
import Git, { Diff } from 'nodegit'
import { join } from 'path'

import { convertCommitToReposCommitObject } from '../converter'
import { genAPIStr }                        from '../../../../../share/utils'
import { API_REPOS_COMMITS }                from '../../../../../share/constants/api'
import config                               from '../../../../../../config.json'

const REPO_ROOT = config.env[process.env.NODE_ENV].REPO_ROOT

export default new Router()
  .get(API_REPOS_COMMITS, onGet)

function onGet(req, res) {
  const { owner, repo, sha } = req.params
  const { sha: from_sha='master' } = req.query
  const repoPath = join(REPO_ROOT, owner, repo)
  Git.Repository.open(repoPath)
    .then(grepo => grepo.getReference(sha || from_sha)
      .then(ref => ref.target())
      .catch(() => sha)
      .then(sha => grepo.getCommit(sha))
      .then(commit => {
        if (sha) {
          // single commit with patches
          const reposCommitObj = convertCommitToReposCommitObject(commit, owner, repo)
          const files = []
          const stats = {
            total: 0,
            additions: 0,
            deletions: 0,
          }
          return commit.getDiff().then(diffs =>
            Promise.all(diffs.map(diff =>
              diff.findSimilar().then(() =>
                diff.patches().then(patches =>
                  Promise.all(patches.map(patch => {
                    const newFile = patch.newFile()
                    const oldFile = patch.oldFile()
                    const filename = newFile.path()
                    const status = patch.status()
                    const filesha = status === Diff.DELTA.DELETED ? oldFile.id().tostrS() : newFile.id().tostrS()
                    const commitsha = status === Diff.DELTA.DELETED ? reposCommitObj.parents[0] && reposCommitObj.parents[0].sha : sha
                    const { total_additions: additions, total_deletions: deletions } = patch.lineStats()
                    return patch.hunks().then(hunks =>
                      Promise.all(hunks.map(hunk => {
                        return hunk.lines().then(lines => {
                          const patchText = hunk.header() + lines.map(line => (String.fromCharCode(line.origin()) + line.content())).join('').replace(/\n$/, '')
                          const file = {
                            sha: filesha,
                            filename,
                            status: convertPatchStatus(status),
                            additions,
                            deletions,
                            changes: additions + deletions,
                            blob_url: genAPIStr('/:owner/:repo}/blob/:sha/:path', {owner, repo, sha: commitsha, path: filename}),
                            raw_url: genAPIStr('/:owner/:repo/raw/:sha/:path', {owner, repo, sha: commitsha, path: filename}),
                            contents_url: genAPIStr('/repos/:owner/:repo/contents/:path}?ref=:sha', {owner, repo, sha: commitsha, path: filename}),
                            patch: patchText,
                            previous_filename: status === Diff.DELTA.RENAMED ? patch.oldFile().path() : undefined,
                          }

                          if (files.some(f => f.filename === filename)) {
                            files.find(f => f.filename === filename).patch += '\n' + patchText
                          } else {
                            files.push(file)
                            stats.total += additions + deletions
                            stats.additions += additions
                            stats.deletions += deletions
                          }
                        })
                      }))
                    )
                  }))
                )
              ))
            )
          )
            .then(() => res.json(merge(reposCommitObj, {files, stats})))
            .catch(err => {
              console.error(err)
              res.status(503).send('503')
            })
        } else {
          commit.history()
            .on('end', commits => {
              res.json(commits.map(commit => (convertCommitToReposCommitObject(commit, owner, repo))))
            })
            .on('error', err => {
              console.error(err)
              res.status(503).end('503')
            })
            .start()
        }
      })
      .catch(err => {
        console.error(Error(err))
        res.status(503).end('503')
      })
    )
    .catch((err) => {
      console.error(Error(err))
      res.status(404).json({message: 'Not Found'})
    })
}

function convertPatchStatus(status) {
  switch(status) {
    case Diff.DELTA.ADDED:
      return 'added'
    case Diff.DELTA.DELETED:
      return 'removed'
    case Diff.DELTA.MODIFIED:
      return 'modified'
    case Diff.DELTA.RENAMED:
      return 'renamed'
    case Diff.DELTA.COPIED:
      return 'copied'
    default:
      return 'unknown'
  }
}
