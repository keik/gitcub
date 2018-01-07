import { createStore, combineReducers, applyMiddleware, compose } from 'redux'

import user from '../reducers/user'
import repository from '../reducers/repository'

const middlewares = []

const enhancer = compose(applyMiddleware(...middlewares))

export default function createConfigureStore(history, preloadedState) {
  return createStore(
    combineReducers({
      user,
      repository
    }),
    preloadedState,
    enhancer
  )
}
