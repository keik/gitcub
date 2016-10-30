import test from 'ava'
import { browserHistory } from 'react-router'

import createConfigureStore from '../lib/share/stores'

test('create store with default options should export two states', (t) => {
  global.window = {}
  const store = createConfigureStore()
  const state = store.getState()
  t.deepEqual(Object.keys(state).sort(), ['repository', 'user'])
})

test('create store with intiial state should overwrite default states', (t) => {
  global.window = {}
  const store = createConfigureStore(browserHistory, { repository: { foo: 'bar' } })
  const state = store.getState()
  t.deepEqual(state.repository.foo, 'bar')
})
