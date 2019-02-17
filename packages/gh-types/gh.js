// @flow

import type { CommitObj, ParentObj } from './nodegit'

export type BranchT = {
  commit: CommitObj,
  name: string
}

export type CommitT = {
  commit: CommitObj,
  html_url: string,
  parents: Array<ParentObj>,
  sha: string,
  url: string
}

export type CommitWithDetailsT = CommitT & {
  files: Array<{
    additions: number,
    blob_url: string,
    changes: number,
    contents_url: string,
    deletions: number,
    filename: string,
    patch: string,
    raw_url: string,
    sha: string,
    status: string // TODO enum
  }>,
  stats: {
    additions: number,
    deletions: number,
    total: number
  }
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

export type UserT = {
  bio: string,
  blog?: string, // TODO
  company?: string, // TODO
  email: string,
  location?: string, // TODO
  login: string,
  name: string
}

// $FlowFixMe
export type TagT = any

export type TreeT = Array<Tree$Entry$WithLastCommitT>

export type Tree$EntryT = {
  path: string,
  sha: string,
  type: 'blob' | 'tree'
}

export type Tree$Entry$WithLastCommitT = Tree$EntryT & {
  lastCommit: CommitObj
}
