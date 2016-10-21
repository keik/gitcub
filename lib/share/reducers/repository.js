import { SHOW_CONTENT } from '../actions/repository'

const initialState = {
  showingContent: ''
}

export default function repository(state = initialState, action) {
  switch(action.type) {
    case SHOW_CONTENT:
      return Object.assign({}, state, {showingContent: action.content})
    default:
      return state
  }
}
