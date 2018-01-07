import debug from 'debug'
import * as SessionActions from '../actions/session-actions'

const d = debug('keik:gh:reducers:session')

export default function session(state = null, action) {
  d(`session (type: ${action.type})`)
  console.log(action)
  switch (action.type) {
    case SessionActions.INITIALIZE:
      return action.session || null
    default:
      return state
  }
}
