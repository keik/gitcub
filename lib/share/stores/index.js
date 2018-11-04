// @flow

import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'

import reducer from '../ducks'

const middlewares = []

if (process.env.NODE_ENV === 'development') middlewares.push(createLogger())

// $FlowFixMe
export default function createConfigureStore(preloadState) {
  return createStore<*, *, *>(
    reducer,
    preloadState,
    applyMiddleware(...middlewares)
  )
}
