// @flow

import { combineReducers } from 'redux'

import branches from './repository/branches'
import commits from './repository/commits'
import entries from './repository/entries'
import repository from '../ducks/repository'
import session from '../ducks/session'
import user from '../ducks/user'

const reducers = {
  branches,
  commits,
  entries,
  repository,
  session,
  user
}

export type ReducersStateT = $ObjMap<typeof reducers, $ExtractFunctionReturn>
export default combineReducers(reducers)
