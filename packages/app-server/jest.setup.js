// @flow

import http from 'http'
import axios from 'axios'

require('@babel/register')

module.exports = async () => {
  const server = http.createServer(function() {
    require('./app').default(...arguments)
  })
  server.listen(8001, '0.0.0.0')
  console.log('Server started with port 8001')
  global.__APP_SERVER__ = server

  // warm up (without this, request tests will be failed for some reason...)
  await axios.get('http://localhost:8001')
}
