import { Router }               from 'express'
import passport                 from 'passport'
import { Strategy }             from 'passport-local'

import db from '../db'

export default new Router()
  .post('/session',
    passport.authenticate('local', {failureRedirect: '/login'}),
    (req, res) => {
      res.redirect('/')
    }
  )

// apply authentication
passport.use(new Strategy({
  usernameField: 'login',
  passwordField: 'password',
  session: true,
}, function(username, password, cb) {
  db.findByUsername(username, function(err, user) {
    if (err) { return cb(err) }
    if (!user) { return cb(null, false) }
    if (user.password !== password) { return cb(null, false) }
    return cb(null, user)
  })
}))

passport.serializeUser(function(user, cb) {
  cb(null, user.id)
})

passport.deserializeUser(function(id, cb) {
  db.findById(id, function (err, user) {
    if (err) { return cb(err) }
    cb(null, user)
  })
})
