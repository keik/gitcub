// @flow

import axios from 'axios'

import type { RepositoryT } from 'gh-types/gh'

export const FETCH = 'FETCH'

export async function fetch(): Promise<
  StandardActionT<typeof FETCH, { repositories: $ReadOnlyArray<RepositoryT> }>
> {
  const { data } = await axios.get(`/api/v1/repositories`)
  return {
    type: FETCH,
    payload: { repositories: data }
  }
}

type State = {
  repositories: $ReadOnlyArray<RepositoryT>
}

export default function repositories(
  state: State = {
    repositories: []
  },
  action: $UnwrapPromise<$Call<typeof fetch, *>>
): State {
  if (action.error) return state
  switch (action.type) {
    case FETCH:
      return action.payload
    default:
      return state
  }
}
