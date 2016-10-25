import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerReducer } from 'react-router-redux'
import createLogger from 'redux-logger'

import repositoryReducer from '../reducers/repository'

export default function createConfigureStore(history, preloadedState) {
  const logger = createLogger()
  const middlewares = []

  // browser only
  if (typeof window !== 'undefined')
    middlewares.push(logger)

  return createStore(
    combineReducers({
      routing: routerReducer,
      repository: repositoryReducer,
    }),
    preloadedState,
    applyMiddleware(...middlewares)
  )
}
