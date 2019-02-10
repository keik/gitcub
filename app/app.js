// @flow

import bodyParser from 'body-parser'
import { spawn } from 'child_process'
import connectRedis from 'connect-redis'
import Express from 'express'
import expressListRoutes from 'express-list-routes'
import session from 'express-session'
import { exists } from 'fs'
import gitBackend from 'git-http-backend'
import morgan from 'morgan'
import { join } from 'path'
import passport from 'passport'
import zlib from 'zlib'

import errorHandlingMiddleware from './errorHandlingMiddleware'
import htmlRenderer from './htmlRenderer'
import routers from './routers'
import config from '../config'

const { REPO_ROOT } = config.env[process.env.NODE_ENV || 'development']

if (process.env.NODE_ENV !== 'production') {
  process.on('unhandledRejection', (reason, promise) => {
    console.error(`unhandledRejection (reason: ${reason}, promise: ${promise})`)
    throw new Error(
      `unhandledRejection (reason: ${reason}, promise: ${promise})`
    )
  })
}

const app = Express()

// add request parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// enable session
const RedisStore = connectRedis(session)
app.use(
  session({
    store: new RedisStore({
      host: 'localhost',
      port: '6379',
      prefix: 'gh:sess:'
    }),
    secret: 'keyboard cat',
    resave: false
  })
)

// add request logger
app.use(morgan('combined'))

// add static directories
app.use(Express.static('dist'))

app.use(passport.initialize())
app.use(passport.session())

// apply git-http-backend when request to
// - `/:owner/:repo/info/refs` as Git smart protocol handshake
// - `/:owner/:repo/git-upload-pack` as clone/fetch process
// - `/:owner/:repo/git-receive-pack` as push process
app.use(
  /\/([^/]+)\/([^/]+)\/(?:info\/refs|git-upload-pack|git-receive-pack)/,
  function(req: express$Request, res: express$Response) {
    const reqStream =
      req.headers['content-encoding'] === 'gzip'
        ? req.pipe(zlib.createGunzip())
        : req

    const { '0': owner, '1': repo } = req.params
    reqStream
      .pipe(
        gitBackend(req.originalUrl, (err, service) => {
          if (err) return res.end(err)

          const dir = join(REPO_ROOT, owner, repo)
          exists(dir, p => {
            const repoPath = p
              ? dir
              : /\.git$/.test(dir)
              ? dir.replace(/\.git/, '')
              : `${dir}.git`
            res.setHeader('content-type', service.type)
            const ps = spawn(service.cmd, service.args.concat(repoPath))
            ps.stdout.pipe(service.createStream()).pipe(ps.stdin)
          })
        })
      )
      .pipe(res)
  }
)

// add routers
routers.forEach(router => {
  app.use(router)
  expressListRoutes(router)
})

// apply HTML renderer middleware
app.use(htmlRenderer)

// error handling
app.use(errorHandlingMiddleware)

export default app
