const cssModulesify = require('css-modulesify')
require('babel-register')
require('css-modules-require-hook')({
  rootDir: './lib/share',
  generateScopedName: process.env.NODE_ENV === 'production' ?
    cssModulesify.generateShortName :
    undefined,
})

const fs = require('fs')
const app = require('./app').default
const config = require('../../config.json')

let { PORT, REPO_ROOT } = config.env[process.env.NODE_ENV]
PORT = process.env.PORT || PORT

app.listen(PORT, () => {
  // create repos directory
  if (!fs.existsSync(REPO_ROOT)) {
    fs.mkdirSync(REPO_ROOT)
  }
  console.log(`start on port ${PORT}`)
})
