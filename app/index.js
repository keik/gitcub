require('@babel/polyfill')
require('@babel/register')

const chokidar = require('chokidar')
const fs = require('fs')
const http = require('http')

const config = require('../config').env[process.env.NODE_ENV]
const PORT = process.env.PORT || config.PORT
const REPO_ROOT = config.REPO_ROOT

// disable cache when file changed
if (process.env.NODE_ENV === 'development') {
  const watcher = chokidar.watch('{app,models,shared}/**')
  watcher.on('ready', () =>
    watcher.on('all', (event, filepath) => {
      console.log(`File ${filepath} changed. Clear module cache...`)
      ;['app/app.js', filepath].forEach(
        f =>
          delete require.cache[require.resolve(f, { paths: [process.cwd()] })]
      )
    })
  )
}

// requiring app on every request to enable module reloading
const server = http.createServer(function() {
  require('./app').default(...arguments)
})

server.listen(PORT, () => {
  // create repos directory
  if (!fs.existsSync(REPO_ROOT)) {
    fs.mkdirSync(REPO_ROOT)
  }
  console.log(`start on port ${PORT}`)
})
