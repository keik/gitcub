import bodyParser from 'body-parser'
import Express from 'express'
import expressListRoutes from 'express-list-routes'
import morgan from 'morgan'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { match, RouterContext } from 'react-router'

import routes from '../share/routes'
import createConfigureStore from '../share/stores'
import routers from './routers'

if (process.env.NODE_ENV !== 'production') {
  process.on('unhandledRejection', (reason, promise) => {
    console.error(`unhandledRejection (reason: ${reason}, promise: ${promise})`)
    throw new Error(`unhandledRejection (reason: ${reason}, promise: ${promise})`)
  })
}

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
      const params = renderProps.params
      Promise
        .all(renderProps.components.map(c => c.fetchData ?
                                           c.fetchData({dispatch, params, host: `http://localhost:${app.get('config').PORT}`}) :
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

/**
 * Return full HTML string with React props
 *
 * @param {string} content content as HTML string
 * @param {object} props React props object for Server-Side Rendering
 * @param {string} entryName name of entrypoint
 */
function renderFullPage(content, props, entryName) {
  return `
 <!DOCTYPE html>
 <html>
   <head>
     <meta charset="utf-8">
     <title>gh</title>
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css">
     <link rel="stylesheet" href="/style.css">
   </head>
   <body>
     <div id="app">${content}</div>
     <script>APP_PROPS = ${JSON.stringify(props)}</script>
     <script src="/${entryName}.js"></script>
   </body>
 </html>
 `
}

export default app
