// @flow

import { Router } from 'express'

import { API_GIT_TAGS } from '../../../../../share/constants/api'

export default Router().get(API_GIT_TAGS, (onGet: any))

function onGet(req, res) {
  res.status(501).end('Not Implemented')
}
