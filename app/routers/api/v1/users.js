// @flow

import { Router } from 'express'

import asyncWrapper from '../../../asyncWrapper'
import { API_USERS } from '../../../../constants/api'
import models from '../../../../models'

export default new Router().get(API_USERS, asyncWrapper(onGet))

async function onGet(req: express$Request, res: express$Response) {
  const { username } = req.params
  const user = await models.User.find({ where: { id: username } })
  debugger
  return res.json(user)
}
