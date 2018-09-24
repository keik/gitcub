// @flow

import { combineReducers } from 'redux'

import repository from '../ducks/repository'
import session from '../ducks/session'
import user from '../ducks/user'

const reducers = {
  repository,
  session,
  user
}

export type ReducersStateT = $ObjMap<typeof reducers, $ExtractFunctionReturn>
export default combineReducers(reducers)
