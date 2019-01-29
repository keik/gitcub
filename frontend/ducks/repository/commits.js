// @flow

import axios from 'axios'

import { API_REPOS_COMMITS } from '../../../constants/api'
import { genAPIStr } from '../../../shared/utils'
import type { CommitT, CommitWithDetailsT } from '../../../types/gh'

export const FETCH: 'COMMITS/FETCH' = 'COMMITS/FETCH'
export const FETCH_ONE_WITH_DETAILS: 'COMMITS/FETCH_ONE_WITH_DETAILS' =
  'COMMITS/FETCH_ONE_WITH_DETAILS'

export async function fetch({
  owner,
  repo,
  tree = ''
}: {
  owner: string,
  repo: string,
  tree?: string
}): Promise<StandardActionT<typeof FETCH, { commits: Array<CommitT> }>> {
  const { data } = await axios.get(
    `/api/v1/repos/${owner}/${repo}/commits?sha=${tree}`
  )
  return {
    type: FETCH,
    payload: { commits: data }
  }
}

export async function fetchOneWithDetails({
  owner,
  repo,
  sha
}: {
  owner: string,
  repo: string,
  sha: string
}): Promise<
  StandardActionT<typeof FETCH_ONE_WITH_DETAILS, { commit: CommitWithDetailsT }>
> {
  const { data } = await axios.get(
    genAPIStr(API_REPOS_COMMITS, { owner, repo, sha })
  )
  return {
    type: FETCH_ONE_WITH_DETAILS,
    payload: { commit: data }
  }
}

type State = Array<CommitT | CommitWithDetailsT>

const initialState = []

export default function comitsReducer(
  state: State = initialState,
  action: $UnwrapPromise<$Call<typeof fetch, *>>
): State {
  if (action.error) return state
  switch (action.type) {
    case FETCH: {
      return action.payload.commits
    }
    case FETCH_ONE_WITH_DETAILS: {
      const { commit } = action.payload
      return state.some(c => (c.sha = commit.sha))
        ? state.map(c => (c.sha === commit.sha ? commit : c))
        : [...state, commit]
    }
    default:
      return state
  }
}
