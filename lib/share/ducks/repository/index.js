// @flow

import { combineReducers } from 'redux'

import entries from './entries'

const reducers = {
  entries
}

export type ReducersStateT = $ObjMap<typeof reducers, $ExtractFunctionReturn>
export default combineReducers(reducers)
