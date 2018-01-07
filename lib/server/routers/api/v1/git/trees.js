import { Router } from 'express'
import { merge } from 'lodash'
import Git from 'nodegit'
import { join } from 'path'

import { genAPIStr } from '../../../../../share/utils'
import { API_GIT_TREES } from '../../../../../share/constants/api'
import { convertCommitToGitCommitObject } from '../converter'
import config from '../../../../../../config.json'

const REPO_ROOT = config.env[process.env.NODE_ENV].REPO_ROOT

export default new Router().use(API_GIT_TREES, onGet)

function onGet(req, res) {
  const { owner, repo, sha = 'master' } = req.params
  const withLastCommit = req.query.last_commit
  const repoPath = join(REPO_ROOT, owner, repo)

  return Git.Repository.openBare(repoPath)
    .then(grepo => {
      return grepo
        .getReference(sha)
        .then(ref => ref.target())
        .catch(() => sha)
        .then(sha => grepo.getCommit(sha))
        .then(commit =>
          commit
            .getTree()
            .then(_walkTree)
            .then(tree => _treeToObject(tree, grepo, commit))
            .then(entries => {
              res.json(entries)
            })
        )
        .catch(err => {
          console.error(Error(err))
          res.status(404).json({ message: 'Not Found' })
        })
    })
    .catch(err => {
      console.error(Error(err))
      res.status(404).json({ message: 'Not Found' })
    })

  function _walkTree(tree) {
    return new Promise((resolve, reject) => {
      tree
        .walk()
        .on('end', resolve)
        .on('error', reject)
        .start()
    })
  }

  function _treeToObject(tree, grepo, gcommit) {
    const trees = {
      url: genAPIStr(API_GIT_TREES, { owner, repo, sha }),
      sha,
      tree: tree.map(entry => ({
        path: entry.path(),
        type: (type => {
          switch (type) {
            case Git.TreeEntry.FILEMODE.TREE:
              return 'tree'
            default:
              return 'blob'
          }
        })(entry.filemode()),
        sha: entry.sha()
      }))
    }

    // retrieve last commit for each entries
    if (withLastCommit) {
      return Promise.all(
        trees.tree.map(entry => {
          const walker = grepo.createRevWalk()
          walker.push(gcommit.sha())
          walker.sorting(Git.Revwalk.SORT.Time)
          function _pickLastCommit(histries) {
            if (histries.length === 0)
              return walker
                .fileHistoryWalk(entry.path, 100)
                .then(_pickLastCommit)
            return histries[0].commit
          }
          return _pickLastCommit([]).then(lastCommit => {
            return merge(entry, {
              lastCommit: convertCommitToGitCommitObject(
                lastCommit,
                owner,
                repo
              )
            })
          })
        })
      ).then(() => {
        return trees
      })
    }
    return trees
  }
}
