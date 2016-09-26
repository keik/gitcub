import {Router} from 'express'
import React from 'react'
import {renderToString} from 'react-dom/server'

import RepositoryApp from '../../share/repository/index'
import {renderFullPage} from '../utils'
import * as RepositoryService from '../service/repository'

export default new Router()
  .get('/:user/:repo', (req, res) => {
    const config = req.app.get('config')
    const user = req.params.user
    const repo = req.params.repo
    Promise.all([
      RepositoryService.getCommits(config, user, repo),
      RepositoryService.getEntries(config, user, repo)
    ]).then(([commits, entries]) => {
      const props = {repo, commits, entries}
      const repositoryHTML = renderToString(React.createElement(RepositoryApp, props))
      const fullHTML = renderFullPage(repositoryHTML, props, 'repository')
      res.end(fullHTML)
    }).catch(err => {
      console.log(err)
      res.status(503).end('503')
    })
  })

  .get('/:user/:repo/tree/:branch/:filepath', (req, res) => {
    const config = req.app.get('config')
    const user = req.params.user
    const repo = req.params.repo
    const branch = req.params.branch
    const filepath = req.params.filepath
    RepositoryService.getContent(config, user, repo, branch, filepath).then(content => {
      const props = {repo, content}
      const repositoryHTML = renderToString(React.createElement(RepositoryApp, props))
      const fullHTML = renderFullPage(repositoryHTML, props, 'repository')
      res.end(fullHTML)
    }).catch(err => {
      console.error(err)
      if (err.message.match('does not exist')) {
        res.status(404).end('not found')
        return
      }
      res.status(503).end('503')
    })
  })
