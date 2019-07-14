// @flow

import axios from 'axios'

import type { BranchT } from 'gh-types/gh'

export const FETCH: 'BRANCHES/FETCH' = 'BRANCHES/FETCH'

export async function fetch({
  owner,
  repo
}: {
  owner: string,
  repo: string
}): Promise<
  StandardActionT<typeof FETCH, {| branches: $ReadOnlyArray<BranchT> |}>
> {
  const { data } = await axios.get(`/api/v1/repos/${owner}/${repo}/branches`)
  return {
    type: FETCH,
    payload: { branches: data }
  }
}

type State = $ReadOnlyArray<BranchT>

export default function branches(
  state: State = [],
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
