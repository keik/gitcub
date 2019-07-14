// @flow

import { API_GIT_TAGS } from 'app-constants/api'
import { Router } from 'express'

export default Router().get(API_GIT_TAGS, (onGet: any))

function onGet(req, res) {
  res.status(501).end('Not Implemented')
}
