import * as RepositoryActions from '../actions/repository-actions'

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
      return Object.assign({}, state, {entry: action.entry})
    default:
      return state
  }
}
