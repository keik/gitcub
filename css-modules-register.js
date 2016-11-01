const cssModulesify = require('css-modulesify')
require('css-modules-require-hook')({
  rootDir: './lib/share',
  generateScopedName: process.env.NODE_ENV === 'production' ?
    cssModulesify.generateShortName :
    undefined,
})
