// @flow

import axios from 'axios'
import { mergeWith } from 'lodash'

import type { RepositoryT } from '../../types/gh'

export const FETCH = 'FETCH'
export const FETCHING = 'FETCHING'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'
export const FETCH_FAILURE = 'FETCH_FAILURE'

export const fetching = () => ({ type: FETCHING })
export const fetchSuccess = (data: any) => ({ type: FETCH_SUCCESS, data })
export const fetchFailure = (error: any) => ({ type: FETCH_FAILURE, error })

export async function fetch(): Promise<
  StandardActionT<typeof FETCH, { repositories: Array<RepositoryT> }>
> {
  const { data } = await axios.get(`/api/v1/repositories`)
  return {
    type: FETCH,
    payload: { repositories: data }
  }
}

type State = {
  loading: boolean,
  repositories: Array<RepositoryT>
}

const initialState = {
  loading: false,
  repositories: []
}

export default function repository(
  // $FlowFixMe
  state: ?{ loading: boolean, [string]: any } = initialState,
  action:
    | $UnwrapPromise<$Call<typeof fetch, *>>
    | $Call<typeof fetching>
    | $Call<typeof fetchSuccess, *>
    | $Call<typeof fetchFailure, *>
): State {
  if (action.error) return state
  switch (action.type) {
    case FETCH:
      return {
        ...state,
        ...action.payload
      }
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
