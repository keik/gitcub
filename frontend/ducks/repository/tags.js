// @flow

import axios from 'axios'

import { API_GIT_REFS } from '../../../constants/api'
import { genAPIStr } from '../../../shared/utils'
import type { TagT } from 'gh-types/gh'

export const FETCH: 'TAGS/FETCH' = 'TAGS/FETCH'

export async function fetch({
  owner,
  repo
}: {
  owner: string,
  repo: string
}): Promise<StandardActionT<typeof FETCH, { tags: $ReadOnlyArray<TagT> }>> {
  // TODO get tags by refs API...
  const { data } = await axios.get(
    `${genAPIStr(API_GIT_REFS, { owner, repo, '*': 'tags' })}`
  )
  return {
    type: FETCH,
    payload: { tags: data }
  }
}

type State = $ReadOnlyArray<TagT>

const initialState = []

export default function tags(
  state: State = initialState,
  action: $UnwrapPromise<$Call<typeof fetch, *>>
): State {
  if (action.error) return state
  switch (action.type) {
    case FETCH: {
      return action.payload.tags
    }
    default:
      return state
  }
}
