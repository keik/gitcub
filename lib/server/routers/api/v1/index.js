import { Router } from 'express'
import fs from 'fs'
import path from 'path'
import Git from 'nodegit'

import * as RepositoryService from '../../../service/repository'

export default new Router()
  .post('/api/v1/users/:user/repositories', (req, res) => {
    const config = req.app.get('config')
    const body = req.body

    if (body.name == null) {
      res.status(400).end('"name" is requred')
      return
    }

    if (fs.existsSync(path.join(config.REPO_ROOT, body.name))) {
      res.status(409).end('repositoriy of specified name already exists')
      return
    }

    Git.Repository.init(path.join(config.REPO_ROOT, body.name), 1)
      .then((repo) => {
        res.status(201).end('new repository was created')
      })
      .catch((err) => {
        res.status(503).end(`error ${err.toString()}`)
      })
  })

  .get('/api/v1/users/:user/repositories/:repo/branches', (req, res) => {
    const config = req.app.get('config')
    const user = req.params.user
    const repo = req.params.repo
    RepositoryService.getBranches(config, user, repo)
      .then((branches) => {
        res.json(branches)
      })
      .catch((err) => {
        console.error(err)
        res.status(503).end('503')
      })
  })

  .get('/api/v1/users/:user/repositories/:repo/commits', (req, res) => {
    const config = req.app.get('config')
    const user = req.params.user
    const repo = req.params.repo
    const branch = req.query.branch || 'master' // TODO: defaults
    RepositoryService.getCommits(config, user, repo, branch)
      .then((commits) => {
        res.json(commits)
      })
      .catch((err) => {
        console.error(err)
        res.status(503).end('503')
      })
  })

  .get('/api/v1/users/:user/repositories/:repo/entries', (req, res) => {
    const config = req.app.get('config')
    const user = req.params.user
    const repo = req.params.repo
    const branch = req.query.branch || 'master' // TODO: defaults
    RepositoryService.getEntries(config, user, repo, branch)
      .then((entries) => {
        res.json(entries)
      })
      .catch((err) => {
        console.error(err)
        res.status(503).end('503')
      })
  })

  .get('/api/v1/users/:user/repositories/:repo/tags', (req, res) => {
    const config = req.app.get('config')
    const user = req.params.user
    const repo = req.params.repo
    RepositoryService.getTags(config, user, repo)
      .then((tags) => {
        res.json(tags)
      })
      .catch((err) => {
        console.error(err)
        res.status(503).end('503')
      })
  })

  .get('/api/v1/users/:user/repositories/:repo/branches/:branch/entries/:path', (req, res) => {
    const config = req.app.get('config')
    const { branch, path, repo, user } = req.params
    RepositoryService.getContent(config, user, repo, branch, path)
      .then((blob) => {
        res.json({
          bytes: blob.length * 2,
          content: blob,
          lines: blob.match(/\n/g).length,
        })
      })
      .catch((err) => {
        console.error(err)
        res.status(503).end('503')
      })
  })
