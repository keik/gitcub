// @flow

import { Router } from 'express'

import { API_USERS } from '../../../../constants/api'
import models from '../../../../models'
import asyncWrapper from '../../../asyncWrapper'

export default new Router().get(API_USERS, asyncWrapper(onGet))

async function onGet(req: express$Request, res: express$Response) {
  const { username } = req.params
  const user = await models.User.find({ where: { login: username } })

  return user ? res.json(user) : res.status(404).end()
}
