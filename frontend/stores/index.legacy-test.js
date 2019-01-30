// @flow

import test from 'tape'

import createConfigureStore from './index'

test('create store with intiial state should overwrite default states', t => {
  global.window = {}
  const store = createConfigureStore({
    repositories: { foo: 'bar' }
  })
  const state = store.getState()
  t.deepEqual((state.repositories: any).foo, 'bar')
  global.window = undefined
  t.end()
})
