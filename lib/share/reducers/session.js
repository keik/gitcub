// @flow

import * as SessionActions from '../actions/session-actions'

export default function session(state: ?{} = null, action: any) {
  switch (action.type) {
    case SessionActions.INITIALIZE:
      return action.session || null
    default:
      return state
  }
}
