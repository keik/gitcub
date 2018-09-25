// @flow

import type { CommitObj, ParentObj } from './nodegit'

export type CommitT = {
  commit: CommitObj,
  parents: Array<ParentObj>,
  sha: string,
  url: string
}

export type EntryT = {
  content: string,
  name: string,
  path: string,
  sha: string,
  size: number,
  type: string,
  url: string
}

export type RepositoryT = {
  full_name: string
}
