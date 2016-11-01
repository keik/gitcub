import { Router } from 'express'

import { API_GIT_TAGS } from '../../../../../share/constants/api'

export default new Router()
  .get(API_GIT_TAGS, onGet)

function onGet(req, res) {
  res.status(501).end('Not Implemented')
}
