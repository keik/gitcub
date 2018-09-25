// @flow

import axios from 'axios'

import type { CommitT } from '../../../types/gh'

export const FETCH: 'COMMITS/FETCH' = 'COMMITS/FETCH'

export async function fetch({
  owner,
  repo
}: {
  owner: string,
  repo: string
}): Promise<StandardActionT<typeof FETCH, { commits: Array<CommitT> }>> {
  const { data } = await axios.get(`/api/v1/repos/${owner}/${repo}/commits`)
  return {
    type: FETCH,
    payload: { commits: data }
  }
}

type State = Array<CommitT>

const initialState = []

export default function repository(
  state: State = initialState,
  action: $UnwrapPromise<$Call<typeof fetch, *>>
): State {
  if (action.error) return state
  switch (action.type) {
    case FETCH: {
      return action.payload.commits
    }
    default:
      return state
  }
}
