// @flow

import { combineReducers } from 'redux'

import branches from './repository/branches'
import commits from './repository/commits'
import entries from './repository/entries'
import repositories from '../ducks/repositories'
import session from '../ducks/session'
import tags from './repository/tags'
import trees from './repository/trees'
import user from '../ducks/user'

const reducers = {
  branches,
  commits,
  entries,
  repositories,
  session,
  tags,
  trees,
  user
}

export type ReducersStateT = $ObjMap<typeof reducers, $ExtractFunctionReturn>
export default combineReducers<typeof reducers, *>(reducers)
