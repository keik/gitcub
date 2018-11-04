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
  res.send(
    renderFullPage(
      null,
      null,
      'main',
      process.env.NODE_ENV === 'production' ? '' : Number(new Date())
    )
  )
}
