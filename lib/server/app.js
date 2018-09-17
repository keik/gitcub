// @flow

import bodyParser from 'body-parser'
import { spawn } from 'child_process'
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
import ssrMiddleware from './ssrMiddleware'
import routers from './routers'
import config from '../../config.json'

const { REPO_ROOT } = config.env[process.env.NODE_ENV]

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
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
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

// apply SSR middleware
app.use(ssrMiddleware)

// error handling
app.use(errorHandlingMiddleware)

export default app
