// @flow

import test from 'tape'

import createConfigureStore from './index'

test('create store with default options should export two states', t => {
  global.window = {}
  const store = createConfigureStore()
  const state = store.getState()
  t.deepEqual(Object.keys(state).sort(), [
    'entries',
    'repository',
    'session',
    'user'
  ])
  global.window = undefined
  t.end()
})

test('create store with intiial state should overwrite default states', t => {
  global.window = {}
  const store = createConfigureStore({
    repository: { foo: 'bar' }
  })
  const state = store.getState()
  t.deepEqual((state.repository: any).foo, 'bar')
  global.window = undefined
  t.end()
})
