// @flow

import { combineReducers } from 'redux'

import repository from '../reducers/repository'
import session from '../reducers/session'
import user from '../reducers/user'

const reducers = {
  repository,
  session,
  user
}

export type ReducersStateT = $ObjMap<typeof reducers, $ExtractFunctionReturn>
export default combineReducers(reducers)
