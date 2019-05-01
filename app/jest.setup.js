// @flow

import http from 'http'

require('@babel/register')

module.exports = (done: *) => {
  const server = http.createServer(function() {
    require('./app').default(...arguments)
  })
  server.listen(8001, done)
  console.log('Server started with port 8001')
  global.__APP_SERVER__ = server
}
