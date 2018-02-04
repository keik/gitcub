// @flow

import test from 'tape'

import routers from './index'

test('routers should be array of Express.Router', t => {
  routers.forEach(router => {
    t.is(typeof router, 'function')
  })
  t.end()
})
