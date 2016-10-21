import { Router } from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createMemoryHistory, match, RouterContext } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import createRepositoryStore from '../../share/stores/repository'

import App from '../../share/containers/app'
import { renderFullPage } from '../utils'

export default new Router()
  .get('/', (req, res) => {
    const memoryHistory = createMemoryHistory(req.url)
    const store = createRepositoryStore(memoryHistory)
    const history = syncHistoryWithStore(memoryHistory, store)

    const appHTML = renderToString(
      <Provider store={store}>
        <App />
      </Provider>
    )
    const fullHTML = renderFullPage(appHTML, {}, 'main')
    res.end(fullHTML)
  })
