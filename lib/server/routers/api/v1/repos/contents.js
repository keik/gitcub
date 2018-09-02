// @flow

import { Router } from 'express'
import Git from 'nodegit'
import { join } from 'path'
import { parse } from 'url'

import config from '../../../../../../config.json'
import { API_REPOS_CONTENTS } from '../../../../../share/constants/api'

const REPO_ROOT = config.env[process.env.NODE_ENV].REPO_ROOT

export default new Router().get(API_REPOS_CONTENTS, (onGet: any))

function onGet(req, res) {
  const {
    params: { owner, repo, '0': path },
    query: { ref = 'master' },
    url
  } = req
  const { pathname = '', search } = parse(url)
  const pathname_ns = pathname.replace(/\/$/, '')
  const repoPath = join(REPO_ROOT, owner, repo)

  function processFileEntry(entry) {
    return entry.getBlob().then(blob => {
      return res.json({
        content: blob.toString(),
        // "download_url": "https://raw.githubusercontent.com/octokit/octokit.rb/master/README.md",
        // "encoding": "base64",
        // "git_url": "https://api.github.com/repos/octokit/octokit.rb/git/blobs/3d21ec53a331a6f037a91c368710b99387d012c1",
        // "html_url": "https://github.com/octokit/octokit.rb/blob/master/README.md",
        name: entry.name(),
        path: entry.path(),
        sha: entry.sha(),
        size: blob.rawsize(),
        type: convertType(blob.filemode()),
        url: `${pathname_ns}${search || ''}`
        // "_links": {
        //   "git": "https://api.github.com/repos/octokit/octokit.rb/git/blobs/3d21ec53a331a6f037a91c368710b99387d012c1",
        //   "self": "https://api.github.com/repos/octokit/octokit.rb/contents/README.md",
        //   "html": "https://github.com/octokit/octokit.rb/blob/master/README.md"
        // },
      })
    })
  }

  function processTree(tree) {
    const entries = tree.entries()
    return res.json(
      entries.map(e => ({
        // "download_url": "https://raw.githubusercontent.com/octokit/octokit.rb/master/lib/octokit.rb",
        // "git_url": "https://api.github.com/repos/octokit/octokit.rb/git/blobs/fff6fe3a23bf1c8ea0692b4a883af99bee26fd3b",
        // "html_url": "https://github.com/octokit/octokit.rb/blob/master/lib/octokit.rb",
        name: e.name(),
        path: e.path(),
        sha: e.sha(),
        size: (e.rawsize && e.rawsize()) || 0,
        type: convertType(e.filemode()),
        url: `${pathname_ns}/${e.name()}${search || ''}`
        // "_links": {
        //   "self": "https://api.github.com/repos/octokit/octokit.rb/contents/lib/octokit.rb",
        //   "git": "https://api.github.com/repos/octokit/octokit.rb/git/blobs/fff6fe3a23bf1c8ea0692b4a883af99bee26fd3b",
        //   "html": "https://github.com/octokit/octokit.rb/blob/master/lib/octokit.rb"
        // },
      }))
    )
  }

  Git.Repository.openBare(repoPath)
    .then(repo =>
      repo
        .getReference(ref)
        .then(ref => ref.target())
        .catch(() => ref)
        .then(ref => repo.getCommit(ref))
        .then(
          commit =>
            path
              ? commit
                  .getEntry(path)
                  .then(
                    entry =>
                      entry.isTree()
                        ? entry.getTree().then(processTree)
                        : processFileEntry(entry)
                  )
              : commit.getTree().then(processTree)
        )
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

function convertType(type) {
  switch (type) {
    case Git.TreeEntry.FILEMODE.TREE:
      return 'dir'
    case Git.TreeEntry.FILEMODE.EXECUTABLE:
    case Git.TreeEntry.FILEMODE.BLOB:
      return 'file'
    case Git.TreeEntry.FILEMODE.LINK:
    case Git.TreeEntry.FILEMODE.COMMIT:
    case Git.TreeEntry.FILEMODE.UNREADABLE:
    default:
      return 'unknown'
  }
}
