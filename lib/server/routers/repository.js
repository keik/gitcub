import {Router} from 'express'
import React from 'react'
import {renderToString} from 'react-dom/server'

import RepositoryView from '../../share/repository'
import {renderFullPage} from '../utils'
import {getCommits} from '../service/repository'

export default new Router()
  .get('/dummy_user/:repoName', (req, res) => {
    const config = req.app.get('config')
    const repoName = req.params.repoName
    getCommits(config, repoName)
      .then(commits => {
        const props = {name: repoName, commits}
        const repositoryHTML = renderToString(React.createElement(RepositoryView, props))
        const fullHTML = renderFullPage(repositoryHTML, props, 'repository')
        res.end(fullHTML)
      })
      .catch(err => {
        console.log(err)
        res.status(503).end('503')
      })
  })
