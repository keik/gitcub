import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'

import repositoryReducer from '../reducers/repository'


export default function createRepositoryStore(history, preloadedState) {
  return createStore(
    combineReducers({
      routing: routerReducer,
      repository: repositoryReducer,
    }),
    preloadedState,
    compose(applyMiddleware(
      routerMiddleware(history)
    ))
  )
}
