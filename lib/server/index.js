require('babel-register')
require('css-modules-require-hook')({
  rootDir: './lib/share'
})

const fs = require('fs')
const app = require('./app').default
const config = require('../../config.json')
config.PORT = process.env.PORT || config.PORT

app.set('config', config)
app.listen(config.PORT, () => {
  // create repos directory
  if (!fs.existsSync(config.REPO_ROOT)) {
    fs.mkdirSync(config.REPO_ROOT)
  }
  console.log(`start on port ${config.PORT}`)
})
