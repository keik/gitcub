import test from 'tape'

import routers from './index'

test('routers should be array of Express.Router', t => {
  routers.forEach(router => {
    t.is(router.name, 'router')
  })
  t.end()
})
