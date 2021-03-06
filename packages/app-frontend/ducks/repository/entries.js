// @flow

import type { EntryT } from '@gitcub/types/gh'
import axios from 'axios'

export const FETCH: 'ENTRIES/FETCH' = 'ENTRIES/FETCH'

export async function fetch({
  owner,
  repo,
  path,
  branch
}: {
  owner: string,
  repo: string,
  path: string,
  branch: string
}): Promise<StandardActionT<typeof FETCH, {| entry: EntryT |}>> {
  const { data } = await axios.get(
    `/api/v1/repos/${owner}/${repo}/contents/${path}?ref=${branch}`
  )
  return {
    type: FETCH,
    payload: { entry: data }
  }
}

type State = $ReadOnlyArray<EntryT>

export default function entries(
  state: State = [],
  action: $UnwrapPromise<$Call<typeof fetch, *>>
): State {
  if (action.error) return state
  switch (action.type) {
    case FETCH: {
      const { entry } = action.payload
      return state.some(e => e.path === entry.path)
        ? state.map(e => (e.path === entry.path ? entry : e))
        : [...state, entry]
    }
    default:
      return state
  }
}
