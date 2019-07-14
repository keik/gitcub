const path = require('path')

const BASE_DIR = '/frontend/components'

module.exports.storyname = (basedir, filename) =>
  path.relative(
    BASE_DIR,
    path.join(basedir, path.basename(filename, '.stories'))
  )
