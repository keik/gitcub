// @flow

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'

import repository from '../reducers/repository'
import session from '../reducers/session'
import user from '../reducers/user'

const middlewares = []

// browser only
if (typeof window !== 'undefined') middlewares.push(createLogger())

const enhancer = compose(applyMiddleware(...middlewares))

export default function createConfigureStore(
  history: any,
  preloadedState: any
) {
  return createStore(
    combineReducers({
      repository,
      session,
      user
    }),
    preloadedState,
    enhancer
  )
}
