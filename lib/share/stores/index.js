import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerReducer } from 'react-router-redux'
import createLogger from 'redux-logger'

import repositoryReducer from '../reducers/repository'

export default function createConfigureStore(history, preloadedState) {
  const logger = createLogger()
  return createStore(
    combineReducers({
      routing: routerReducer,
      repository: repositoryReducer,
    }),
    preloadedState,
    applyMiddleware(logger)
  )
}
