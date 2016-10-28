import { Router } from 'express'
import fs from 'fs'
import { join } from 'path'
import Git, { TreeEntry } from 'nodegit'
import { parse } from 'url'

import * as RepositoryService from '../../../service/repository'

// TODO redesign
export const API_BRANCHES = '/api/v1/repos/:owner/:repo/branches'
export const API_TAGS = '/api/v1/repos/:owner/:repo/tags'

// Git API
export const API_GIT_REPOS = '/api/v1/user/repos'
export const API_GIT_COMMITS = '/api/v1/repos/:owner/:repo/git/commits/:sha'
export const API_GIT_TREES = '/api/v1/repos/:owner/:repo/git/trees(/:sha)?'
export const API_GIT_BLOBS = '/api/v1/repos/:owner/:repo/git/blobs/:sha*'

// Repositories API
export const API_REPOS_COMMITS = '/api/v1/repos/:owner/:repo/commits'
export const API_REPOS_CONTENTS = '/api/v1/repos/:owner/:repo/contents/?*'

export default new Router()
  .post(API_GIT_REPOS, (req, res) => {
    const config = req.app.get('config')
    const { name, __owner } = req.body  // TODO unparameterize __owner retrieving authorization
    if (name == null) {
      res.status(400).end('"name" is requred')
      return
    }

    const repoPath = join(config.REPO_ROOT, __owner, name)
    if (fs.existsSync(repoPath)) {
      res.status(409).end('repositoriy of specified name already exists')
      return
    }

    Git.Repository.init(repoPath, 1)
      .then((repo) => {
        res.status(201).end('new repository was created')
      })
      .catch((err) => {
        res.status(503).end(`error ${err.toString()}`)
      })
  })

  .get(API_BRANCHES, (req, res) => {
    const config = req.app.get('config')
    const owner = req.params.owner
    const repo = req.params.repo
    RepositoryService.getBranches(config, owner, repo)
      .then((branches) => {
        res.json(branches)
      })
      .catch((err) => {
        console.error(err)
        res.status(503).end('503')
      })
  })

  .get(API_GIT_COMMITS, (req, res) => {
    const config = req.app.get('config')
    const { owner, repo, sha } = req.params
    console.log('API_GIT_COMMIT')
    const repoPath = join(config.REPO_ROOT, owner, repo)
    let _repo
    let _gcommit
    Git.Repository.openBare(repoPath)
      .then(repo => (_repo = repo).getReference(sha))
      .then(ref => ref.target())
      .catch(err => sha)
      .then(sha => _repo.getCommit(sha))
      .then(commit => {
        console.log(commit.author().when())

        const author = commit.author()
        const committer = commit.committer()
        res.json({
          author: {
            date: new Date(author.when().time() * 1000).toISOString(),
            email: author.email(),
            name: author.name(),
          },
          committer: {
            date: new Date(committer.when().time() * 1000).toISOString(),
            email: committer.email(),
            name: committer.name(),
          },
          message: commit.message(),
          parents: commit.parents().map(oid => ({
            url: API_GIT_COMMITS.replace(/:owner/, owner).replace(/:repo/, repo).replace(/:sha/, oid.tostrS()),
            sha: oid.tostrS(),
          })),
          sha: commit.sha(),
          tree: {
            url: API_GIT_TREES.replace(/:owner/, owner).replace(/:repo/, repo).replace(/:sha/, commit.treeId().tostrS()),
            sha: commit.treeId().tostrS(),
          },
          url: `/git/commits/${sha}`,
        })
      })
      .catch((err) => {
        console.error(err)
        res.status(503).end('503')
      })
  })

  .get(API_GIT_TREES, (req, res) => {
    const config = req.app.get('config')
    const { url } = req
    const { owner, repo, sha } = req.params
    const withLastCommit = req.query.last_commit
    RepositoryService.getEntries(url, config, owner, repo, sha, withLastCommit)
      .then((entries) => {
        res.json(entries)
      })
      .catch((err) => {
        console.error(err)
        res.status(503).end('503')
      })
  })

  .get(API_GIT_BLOBS, (req, res) => {
    const config = req.app.get('config')
    const { url, params: { owner, repo, sha } } = req
    const path = req.params[0].replace(/^\//, '')
    RepositoryService.getBlob(url, config, owner, repo, sha, path)
      .then((blob) => {
        const content = blob.toString()
        res.json({
          bytes: blob.rawsize(),
          content,
          lines: content.match(/\n/g).length,
          sha: blob.id().tostrS(),
        })
      })
      .catch((err) => {
        console.error(new Error(err))
        res.status(503).end('503')
      })
  })

  .get(API_TAGS, (req, res) => {
    const config = req.app.get('config')
    const owner = req.params.owner
    const repo = req.params.repo
    RepositoryService.getTags(config, owner, repo)
      .then((tags) => {
        res.json(tags)
      })
      .catch((err) => {
        console.error(err)
        res.status(503).end('503')
      })
  })

// Repositories API

  .get(API_REPOS_COMMITS, (req, res) => {
    const config = req.app.get('config')
    const { owner, repo } = req.params
    const branch = req.query.branch || 'master' // TODO: defaults
    const repoPath = join(config.REPO_ROOT, owner, repo)
    let _repo
    Git.Repository.openBare(repoPath)
      .then(_repo => _repo.getBranchCommit(branch))
      .then(commit => new Promise((resolve, reject) => commit
        .history()
        .on('end', commits => {
          resolve(commits.map(_commit => ({
            id: _commit.id().tostrS(),
            date: _commit.date().toISOString(),
            body: _commit.body(),
            message: _commit.message(),
          })))
        })
        .on('error', err => reject(err))
        .start()))
      .then(commits => res.json(commits))
      .catch((err) => {
        console.error(err)
        res.status(503).end('503')
      })
  })

  .get(API_REPOS_CONTENTS, (req, res) => {
    const config = req.app.get('config')
    const { params: { owner, repo, 0: path }, query: { ref='master' }, url } = req
    const { pathname, search } = parse(url)
    const pathname_ns = pathname.replace(/\/$/, '')
    const repoPath = join(config.REPO_ROOT, owner, repo)

    function processFileEntry(entry) {
      return entry.getBlob()
        .then(blob => {
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
      return res.json(entries.map(e => ({
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
      })))
    }

    let _repo
    Git.Repository.openBare(repoPath)
      .then(repo => (_repo = repo).getReference(ref))
      .then(ref => ref.target())
      .catch(err => ref)
      .then(ref => _repo.getCommit(ref))
      .then(commit => path ?
        commit.getEntry(path)
          .then(entry => entry.isTree() ?
            entry.getTree().then(processTree) :
            processFileEntry(entry)
          ) :
        commit.getTree()
          .then(processTree))
      .catch((err) => {
        console.error(err)
        res.status(503).end('503')
      })
  })

function convertType(type) {
  switch(type) {
    case TreeEntry.FILEMODE.TREE:
      return 'dir'
    case TreeEntry.FILEMODE.EXECUTABLE:
    case TreeEntry.FILEMODE.BLOB:
      return 'file'
    case TreeEntry.FILEMODE.LINK:
    case TreeEntry.FILEMODE.COMMIT:
    case TreeEntry.FILEMODE.UNREADABLE:
    default:
      return 'unknown'
  }
}
