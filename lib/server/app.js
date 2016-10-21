import bodyParser from 'body-parser'
import Express from 'express'
import expressListRoutes from 'express-list-routes'
import morgan from 'morgan'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createMemoryHistory, match, RouterContext } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import routers from './routers'
import config from '../../config.json'
import routes from '../share/routes'

import createRepositoryStore from '../share/stores/repository'
import { renderFullPage } from './utils'

const app = new Express()

// add request parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// add request logger
app.use(morgan('combined'))

// add static directories
app.use(Express.static('bundle'))

app.use(function (req, res) {
  const memoryHistory = createMemoryHistory(req.url)
  const store = createRepositoryStore(memoryHistory)
  const history = syncHistoryWithStore(memoryHistory, store)

  match({ history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      console.log(renderProps)
      const content = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps}/>
        </Provider>
      )
      res.send(renderFullPage(content, store.getState(), 'main'))
    } else {
      res.status(404).send('Not found')
    }
  })
})

// add routers
/* Object.keys(routers).forEach((router) => {
 *   app.use(routers[router])
 *   expressListRoutes(routers[router])
 * })*/

// set global application config
app.set('config', config)

export default app
