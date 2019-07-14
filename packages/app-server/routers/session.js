// @flow

import { Router } from 'express'
import passport from 'passport'
import { Strategy } from 'passport-local'

import models from '../models'

export default new Router()
  .post(
    '/session',
    passport.authenticate('local', { failureRedirect: '/login' }),
    ((req, res) => {
      res.redirect('/')
    }: any)
  )
  .get(
    '/me',
    async (req: express$Request & { user: * }, res: express$Response) => {
      if (process.env.DUMMY_SESSION != null) {
        const user = await models.User.find({ where: { id: 1 } })
        res.json(user)
        return
      }
      req.user == null ? res.status(401).end() : res.json(req.user)
    }
  )

// apply authentication
passport.use(
  new Strategy(
    {
      usernameField: 'login',
      passwordField: 'password',
      session: true
    },
    async (username, password, cb) => {
      const user = await models.User.find({
        where: { login: username, password }
      })
      if (!user) {
        return cb(null, false)
      }
      return cb(null, user)
    }
  )
)

passport.serializeUser(function(user, cb) {
  cb(null, user.id)
})

passport.deserializeUser(async (id, cb) => {
  const user = await models.User.find({ where: { id } })
  if (!user) {
    return cb(null, false)
  }
  cb(null, user)
})
