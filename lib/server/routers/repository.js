import {Router} from 'express'
import React from 'react'
import {renderToString} from 'react-dom/server'

import RepositoryView from '../../share/repository'
import {renderFullPage} from '../utils'
import {getCommits, getEntries, getContent} from '../service/repository'

export default new Router()
  .get('/dummy_user/:repo', (req, res) => {
    const config = req.app.get('config')
    const repo = req.params.repo
    Promise.all([
      getCommits(config, repo),
      getEntries(config, repo)
    ]).then(([commits, entries]) => {
      const props = {repo, commits, entries}
      const repositoryHTML = renderToString(React.createElement(RepositoryView, props))
      const fullHTML = renderFullPage(repositoryHTML, props, 'repository')
      res.end(fullHTML)
    }).catch(err => {
      console.log(err)
      res.status(503).end('503')
    })
  })

  .get('/dummy_user/:repo/tree/:branch/:filepath', (req, res) => {
    const config = req.app.get('config')
    const repo = req.params.repo
    const branch = req.params.branch
    const filepath = req.params.filepath
    getContent(config, repo, branch, filepath).then(content => {
      const props = {repo, content}
      const repositoryHTML = renderToString(React.createElement(RepositoryView, props))
      const fullHTML = renderFullPage(repositoryHTML, props, 'repository')
      res.end(fullHTML)

      res.end(content)
    }).catch(err => {
      console.error(err)
      if (err.message.match('does not exist')) {
        res.status(404).end('not found')
        return
      }
      res.status(503).end('503')
    })
  })
