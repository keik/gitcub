import bodyParser               from 'body-parser'
import { spawn }                from 'child_process'
import debug                    from 'debug'
import Express                  from 'express'
import expressListRoutes        from 'express-list-routes'
import { exists }               from 'fs'
import gitBackend               from 'git-http-backend'
import morgan                   from 'morgan'
import { join }                 from 'path'
import React                    from 'react'
import { renderToString }       from 'react-dom/server'
import { Provider }             from 'react-redux'
import { match, RouterContext } from 'react-router'
import zlib                     from 'zlib'

import routers              from './routers'
import routes               from '../share/routes'
import createConfigureStore from '../share/stores'
import config               from '../../config.json'

const d = debug('keik:gh:server:app')

const { REPO_ROOT } = config.env[process.env.NODE_ENV]

if (process.env.NODE_ENV !== 'production') {
  process.on('unhandledRejection', (reason, promise) => {
    console.error(`unhandledRejection (reason: ${reason}, promise: ${promise})`)
    throw new Error(`unhandledRejection (reason: ${reason}, promise: ${promise})`)
  })
}

const app = new Express()

// add request parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// add request logger
app.use(morgan('combined'))

// add static directories
app.use(Express.static('bundle'))

// apply git-http-backend when request to
// - `/:owner/:repo/info/refs` as Git smart protocol handshake
// - `/:owner/:repo/git-upload-pack` as clone/fetch process
// - `/:owner/:repo/git-receive-pack` as push process
app.use(/\/([^\/]+)\/([^\/]+)\/(?:info\/refs|git-upload-pack|git-receive-pack)/, function(req, res) {
  const reqStream = req.headers['content-encoding'] === 'gzip' ?
    req.pipe(zlib.createGunzip()) : req

  const { 0: owner, 1: repo } = req.params
  reqStream.pipe(gitBackend(req.originalUrl, (err, service) => {
    if (err)
      return res.end(err)

    const dir = join(REPO_ROOT, owner, repo)
    exists(dir, (p) => {
      const repoPath = p ? dir :
        /\.git$/.test(dir) ? dir.replace(/\.git/, '') : `${dir}.git`
      res.setHeader('content-type', service.type)
      const ps = spawn(service.cmd, service.args.concat(repoPath))
      ps.stdout.pipe(service.createStream()).pipe(ps.stdin)
    })
  })).pipe(res)
})

app.use(function(req, res, next) {
  if (/\/api/.test(req.url) || req.url === '/favicon.ico')
    return next()
  const store = createConfigureStore()
  match({ routes: routes(store), location: req.url }, (error, redirectLocation, renderProps) => {
    d('SSR middleware', req.url)
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const html = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      )
      const state = store.getState()
      res.send(renderFullPage(html, state, 'bundle', process.env.NODE_ENV === 'production' ? '' : Number(new Date())))
    } else {
      next()
    }
  })
})

// add routers
Object.keys(routers).forEach((router) => {
  app.use(routers[router])
  expressListRoutes(routers[router])
})

/**
 * Return full HTML string with React props
 *
 * @param {string} content content as HTML string
 * @param {object} props React props object for Server-Side Rendering
 * @param {string} entryName name of entrypoint
 */
function renderFullPage(content, props, entryName, bust) {
  return `
 <!DOCTYPE html>
 <html>
   <head>
     <meta charset="utf-8">
     <title>gh</title>
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css">
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.7.0/styles/github.min.css">
     <link rel="stylesheet" href="/style.css?${bust}">
   </head>
   <body>
     <div id="app">${content}</div>
     <script>APP_PROPS = ${JSON.stringify(props)}</script>
     <script src="/${entryName}.js?${bust}"></script>
   </body>
 </html>
 `
}

export default app
