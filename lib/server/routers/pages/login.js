import { Router }         from 'express'
import React              from 'react'
import { renderToString } from 'react-dom/server'

import { renderStaticPage } from '../../renderer'
import Login                from '../../../share/components/login'
import { PAGES_LOGIN }      from '../../../share/constants/pages'

export default new Router()
  .get(PAGES_LOGIN, onGet)

function onGet(req, res) {
  const html = renderToString(<Login />)
  res.send(renderStaticPage(html, process.env.NODE_ENV === 'production' ? '' : Number(new Date())))
}
