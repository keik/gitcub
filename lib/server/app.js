import bodyParser from 'body-parser'
import Express from 'express'
import expressListRoutes from 'express-list-routes'
import morgan from 'morgan'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { match, RouterContext } from 'react-router'

import routers from './routers'
import routes from '../share/routes'

import createConfigureStore from '../share/stores'
import { renderFullPage } from './utils'

const app = new Express()

// add request parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// add request logger
app.use(morgan('combined'))

// add static directories
app.use(Express.static('bundle'))

app.use(function (req, res, next) {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const store = createConfigureStore()
      const dispatch = store.dispatch
      Promise
        .all(renderProps.components.map(c => c.fetchData ?
                                           c.fetchData({dispatch, ...renderProps.params}) :
                                           Promise.resolve(false)))
        .then((r) => {
          const html = renderToString(
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>
          )
          // TODO detec fetched store
          const state = store.getState()
          state.repository.fetched = true
          res.send(renderFullPage(html, state, 'bundle'))
        })
        .catch((err) => {
          console.error(err)
          res.end(err.toString())
        })
    } else {
      next()
    }
  })
})

// add routers
Object.keys(routers).forEach((router) => {
  app.use(routers[router])
  expressListRoutes(routers[router])
})

export default app
