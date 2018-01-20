// @flow

import debug from 'debug'
import { mergeWith } from 'lodash'

import * as RepositoryActions from '../actions/repository-actions'

const d = debug('keik:gh:reducers:repository')

const initialState = {
  loading: false
}

export default function repository(
  state: ?{ loading: boolean, [string]: any } = initialState,
  action: any
) {
  d(`repository (type: ${action.type}`)
  switch (action.type) {
    case RepositoryActions.FETCHING:
      return Object.assign({}, state, { loading: true })
    case RepositoryActions.FETCH_SUCCESS:
      return (mergeWith: any)(
        {},
        state,
        { loading: false },
        ...action.data,
        forRepositoryState
      )
    case RepositoryActions.FETCH_FAILURE:
      return Object.assign({}, state, { loading: false, error: action.error })
    default:
      return state
  }
}

function forRepositoryState(objValue, srcValue, key) {
  if (!objValue) return srcValue

  if (key === 'commit') {
    // TODO merge parent `commmits` array
    return srcValue
  }

  if (key === 'entries') {
    return srcValue.reduce((acc, src) => {
      let same = acc.find(o => o.sha === src.sha)
      if (same) Object.assign(same, src)
      else acc.push(src)
      return acc
    }, objValue)
  }

  if (Array.isArray(objValue) && srcValue != null) {
    return objValue.concat(srcValue)
  }
}
