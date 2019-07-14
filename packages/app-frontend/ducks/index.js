// @flow

import { combineReducers } from 'redux'

import repositories from './repositories'
import branches from './repository/branches'
import commits from './repository/commits'
import entries from './repository/entries'
import tags from './repository/tags'
import trees from './repository/trees'
import session from './session'
import users from './users'

export default combineReducers<*, *>({
  branches,
  commits,
  entries,
  repositories,
  session,
  tags,
  trees,
  users
})
