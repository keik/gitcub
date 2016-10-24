import * as RepositoryActions from '../actions/repository-actions'
import merge from 'lodash.merge'

const initialState = {
  loading: false,
  fetched: false,
}

export default function repository(state = initialState, action) {
  switch(action.type) {
    case RepositoryActions.FETCHING:
      return Object.assign({}, state, {loading: true})
    case RepositoryActions.FETCH_SUCCESS:
      return Object.assign({}, state, {loading: false, ...action})
    case RepositoryActions.FETCH_FAILURE:
      return Object.assign({}, state, {loading: false, error: action.error})
    case RepositoryActions.FETCH_ENTRY_SUCCESS:
      // TODO manage entry in entries array
      const newState = Object.assign({}, state, {entry: action.entry})
      newState.entries.push(action.entry)
      return newState
    default:
      return state
  }
}
