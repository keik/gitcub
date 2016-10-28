import { Router } from 'express'
import fs from 'fs'
import path from 'path'
import Git from 'nodegit'

import * as RepositoryService from '../../../service/repository'

export const API_REPOS = '/api/v1/user/repos'
export const API_BRANCHES = '/api/v1/repos/:owner/:repo/branches'
export const API_COMMITS = '/api/v1/repos/:owner/:repo/commits'
export const API_TREES = '/api/v1/repos/:owner/:repo/git/trees(/:sha)?'
export const API_BLOBS = '/api/v1/repos/:owner/:repo/git/blobs/:sha*'
export const API_TAGS = '/api/v1/repos/:owner/:repo/tags'

export default new Router()
  .post(API_REPOS, (req, res) => {
    const config = req.app.get('config')
    const { name, __owner } = req.body  // TODO unparameterize __owner retrieving authorization
    if (name == null) {
      res.status(400).end('"name" is requred')
      return
    }

    const repoPath = path.join(config.REPO_ROOT, __owner, name)
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

  .get(API_COMMITS, (req, res) => {
    const config = req.app.get('config')
    const owner = req.params.owner
    const repo = req.params.repo
    const branch = req.query.branch || 'master' // TODO: defaults
    RepositoryService.getCommits(config, owner, repo, branch)
      .then((commits) => {
        res.json(commits)
      })
      .catch((err) => {
        console.error(err)
        res.status(503).end('503')
      })
  })

  .get(API_TREES, (req, res) => {
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

  .get(API_BLOBS, (req, res) => {
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
