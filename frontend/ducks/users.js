// @flow

import axios from 'axios'

import type { UserT } from 'gh-types/gh'

export const GET_USER: 'USERS/GET_USER' = 'USERS/GET_USER'

export async function getUser(
  username: string
): Promise<StandardActionT<typeof GET_USER, { [string]: UserT }>> {
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

const initialState = {}

export default function users(
  state: { name: string } = initialState,
  action: $UnwrapPromise<$Call<typeof getUser, *>>
) {
  switch (action.type) {
    case GET_USER:
      return action.error ? state : { ...state, ...action.payload }
    default:
      return state
  }
}
