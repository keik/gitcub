// @flow

export const INITIALIZE = 'INITIALIZE'

export const initialize = (session: any) => ({ type: INITIALIZE, session })

export default function session(state: ?{} = null, action: any) {
  switch (action.type) {
    case INITIALIZE:
      return action.session || null
    default:
      return state
  }
}
