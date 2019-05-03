// @flow

import assert from 'assert'

import routers from './index'

test('routers should be array of Express.Router', () => {
  routers.forEach(router => {
    assert(typeof router === 'function')
  })
})
