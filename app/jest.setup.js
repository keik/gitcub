// @flow

import http from 'http'

require('@babel/register')

module.exports = async () => {
  const server = http.createServer(function() {
    require('./app').default(...arguments)
  })
  server.listen(8001, '0.0.0.0')
  console.log('Server is starting...')
  global.__APP_SERVER__ = server
  await new Promise(r => setTimeout(r, 10000))
  console.log('Server started with port 8001')
}
