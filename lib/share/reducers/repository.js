import debug from 'debug'
import { merge, mergeWith } from 'lodash'

import * as RepositoryActions from '../actions/repository-actions'

const d = debug('keik:gh:reducers:repository')

const initialState = {
  loading: false,
  fetched: false,
}

export default function repository(state = initialState, action) {
  d(`repository (action: ${JSON.stringify(action)})`)
  switch(action.type) {
    case RepositoryActions.FETCHING:
      return Object.assign({}, state, {loading: true})
    case RepositoryActions.FETCH_SUCCESS:
      return  mergeWith({}, state, ...action.data, forRepositoryState)
    case RepositoryActions.FETCH_FAILURE:
      return Object.assign({}, state, {loading: false, error: action.error})
    case RepositoryActions.FETCH_BRANCHES_SUCCESS:
      const branches = action.branches
      return merge({}, state, {branches})
    case RepositoryActions.FETCH_COMMITS_SUCCESS:
      const commits = action.commits
      return merge({}, state, {commits})
    case RepositoryActions.FETCH_ENTRIES_SUCCESS:
      const entries = action.entries
      return merge({}, state, {entries})
    case RepositoryActions.FETCH_TAGS_SUCCESS:
      const tags = action.tags
      return merge({}, state, {tags})
    case RepositoryActions.FETCH_ENTRY_SUCCESS:
      const entry = action.entry
      return merge({}, state, {entries: [entry]})
    default:
      return state
  }
}

function forRepositoryState(objValue, srcValue, key, obj, src) {
  if (!objValue)
    return srcValue

  if (key === 'entries') {
    return srcValue.reduce((acc, src) => {
      let same = acc.find(o => o.sha === src.sha)
      if (same)
        Object.assign(same, src)
      else
        acc.push(src)
      return acc
    }, objValue)
  }

  if (Array.isArray(objValue) && srcValue != null) {
    return objValue.concat(srcValue)
  }
}
