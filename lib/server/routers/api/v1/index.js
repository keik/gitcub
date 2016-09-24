import {Router} from 'express'
import fs from 'fs'
import path from 'path'
import Git from 'nodegit'

export default new Router()
  .post('/api/v1/repositories', (req, res) => {
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
      .then(repo => {
        res.status(201).end('new repository was created')
      })
      .catch(err => {
        res.status(503).end('error' + err.toString())
      })
  })

  .get('/api/v1/repositories/:repoName/commits', (req, res) => {
    const config = req.app.get('config')
    Git.Repository.openBare(path.join(config.REPO_ROOT, req.params.repoName)).then(repo => {
      return repo.getBranchCommit('master')
    }).then(commit => {
      const hist = commit.history()
      hist
        .on('end', commits => {
          res.json(commits.map(commit => ({
            id: commit.id().tostrS(),
            date: commit.date(),
            body: commit.body(),
            message: commit.message()
          })))
        })
        .on('error', err => {
          console.log(err)
        })
      hist.start()
    }).catch(err => {
      res.end('a')
      console.error('err', err)
    })
  })
