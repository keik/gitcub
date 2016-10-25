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
    case RepositoryActions.FETCH_ENTRIES_SUCCESS:
      const entries = action.entries
      return merge({}, state, {entries})
    case RepositoryActions.FETCH_ENTRY_SUCCESS:
      const entry = action.entry
      const entryContent = entry[Object.keys(entry)[0]]
      return merge({}, state, {entries: action.entry, entry: entryContent})
    default:
      return state
  }
}
