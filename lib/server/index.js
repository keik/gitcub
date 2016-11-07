require('babel-register')

const fs = require('fs')
const app = require('./app').default
const config = require('../../config.json').env[process.env.NODE_ENV]

const PORT = process.env.PORT || config.PORT
const REPO_ROOT = config.REPO_ROOT

app.listen(PORT, () => {
  // create repos directory
  if (!fs.existsSync(REPO_ROOT)) {
    fs.mkdirSync(REPO_ROOT)
  }
  console.log(`start on port ${PORT}`)
})
