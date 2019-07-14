// @flow

import type { UserT } from '@gitcub/types/gh'
import axios from 'axios'

export const GET_USER: 'USERS/GET_USER' = 'USERS/GET_USER'

export async function getUser(
  username: string
): Promise<StandardActionT<typeof GET_USER, {| [string]: UserT |}>> {
  const res = await axios
    .get(`/api/v1/users/${username}`)
    .catch(e => e.response)
  return res.status < 400
    ? {
        type: GET_USER,
        payload: { [username]: res.data }
      }
    : {
        type: GET_USER,
        error: true,
        payload: new Error('Error')
      }
}

type State = { [name: string]: UserT }

export default function users(
  state: State = {},
  action: $UnwrapPromise<$Call<typeof getUser, *>>
): State {
  switch (action.type) {
    case GET_USER:
      return action.error ? state : { ...state, ...action.payload }
    default:
      return state
  }
}
