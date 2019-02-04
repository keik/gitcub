// @flow

import axios from 'axios'

import type { BranchT } from '../../../types/gh'

export const FETCH: 'BRANCHES/FETCH' = 'BRANCHES/FETCH'

export async function fetch({
  owner,
  repo
}: {
  owner: string,
  repo: string
}): Promise<StandardActionT<typeof FETCH, { branches: Array<BranchT> }>> {
  const { data } = await axios.get(`/api/v1/repos/${owner}/${repo}/branches`)
  return {
    type: FETCH,
    payload: { branches: data }
  }
}

type State = Array<BranchT>

const initialState = []

export default function branches(
  state: State = initialState,
  action: $UnwrapPromise<$Call<typeof fetch, *>>
): State {
  if (action.error) return state
  switch (action.type) {
    case FETCH: {
      return action.payload.branches
    }
    default:
      return state
  }
}
