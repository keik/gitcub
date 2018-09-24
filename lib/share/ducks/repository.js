// @flow

import { mergeWith } from 'lodash'

export const FETCHING = 'FETCHING'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'
export const FETCH_FAILURE = 'FETCH_FAILURE'

export const fetching = () => ({ type: FETCHING })
export const fetchSuccess = (data: any) => ({ type: FETCH_SUCCESS, data })
export const fetchFailure = (error: any) => ({ type: FETCH_FAILURE, error })

const initialState = {
  loading: false
}

export default function repository(
  state: ?{ loading: boolean, [string]: any } = initialState,
  action: any
) {
  switch (action.type) {
    case FETCHING:
      return Object.assign({}, state, { loading: true })
    case FETCH_SUCCESS:
      return (mergeWith: any)(
        {},
        state,
        { loading: false },
        ...action.data,
        forRepositoryState
      )
    case FETCH_FAILURE:
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
