// @flow

import debug from 'debug'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { match, RouterContext } from 'react-router'
import { ServerStyleSheet } from 'styled-components'

import { renderFullPage } from './renderer'
import routes from '../share/routes'
import createConfigureStore from '../share/stores'
import * as SessionActions from '../share/ducks/session'

const d = debug('keik:gh:server:ssrMiddleware')

export default function ssrMiddleware(
  req: express$Request & { user: * },
  res: express$Response,
  next: express$NextFunction
) {
  if (/\/api/.test(req.url) || req.url === '/favicon.ico') return next()
  const store = createConfigureStore()
  match(
    { routes: routes(store), location: req.url },
    async (error, redirectLocation, renderProps) => {
      d('SSR middleware', req.url)
      if (error) {
        res.status(500).send(error.message)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {
        store.dispatch(SessionActions.initialize(req.user))
        try {
          const sheet = new ServerStyleSheet()
          const html = renderToString(
            sheet.collectStyles(
              <Provider store={store}>
                <RouterContext {...renderProps} />
              </Provider>
            )
          )
          const state = store.getState()
          res.send(
            renderFullPage(
              html,
              state,
              'main',
              process.env.NODE_ENV === 'production' ? '' : Number(new Date())
            )
          )
        } catch (e) {
          next(e)
        }
      } else {
        next()
      }
    }
  )
}
