import { createStore } from 'redux'
import repositoryReducer from '../reducers/repository'

export default function createRepositoryStore(preloadedState) {
  return createStore(
    repositoryReducer,
    preloadedState
  )
}
