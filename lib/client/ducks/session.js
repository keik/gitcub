// @flow

import axios from 'axios'

export const GET_CURRENT_USER = 'GET_CURRENT_USER'

export type SessionT = {
  bio: string,
  email: string,
  login: string,
  name: string,
  password: string
}

type State = ?SessionT

export const getCurrentUser = async () => {
  const res = await axios.get('/me').catch(e => e.response)
  return res.status < 400
    ? { type: GET_CURRENT_USER, payload: res.data }
    : {
        type: GET_CURRENT_USER,
        error: true,
        payload: new Error('Not authorized')
      }
}

export default function session(state: State = null, action: any): State {
  switch (action.type) {
    case GET_CURRENT_USER:
      return action.error ? state : action.payload
    default:
      return state
  }
}
