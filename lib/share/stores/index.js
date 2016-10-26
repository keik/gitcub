import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'

import user from '../reducers/user'
import repository from '../reducers/repository'

export default function createConfigureStore(history, preloadedState) {
  const logger = createLogger()
  const middlewares = []

  // browser only
  if (typeof window !== 'undefined')
    middlewares.push(logger)

  return createStore(
    combineReducers({
      user,
      repository,
    }),
    preloadedState,
    applyMiddleware(...middlewares)
  )
}
