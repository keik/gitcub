import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'

import DevTools from '../devtools'
import user from '../reducers/user'
import repository from '../reducers/repository'

const middlewares = []

// browser only
if (typeof window !== 'undefined')
  middlewares.push(createLogger())

const enhancer = compose(
  applyMiddleware(...middlewares),
  DevTools.instrument()
)

export default function createConfigureStore(history, preloadedState) {
  return createStore(
    combineReducers({
      user,
      repository,
    }),
    preloadedState,
    enhancer,
  )
}
