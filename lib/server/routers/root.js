import {Router} from 'express'
import React from 'react'
import {renderToString} from 'react-dom/server'

import App from '../../share/app'
import {renderFullPage} from '../utils'

export default new Router()
  .get('/', (req, res) => {
    const appHTML = renderToString(React.createElement(App)),
          fullHTML = renderFullPage(appHTML, {}, 'main')
    res.end(fullHTML)
  })
