// @flow

export type Commit = {
  author: () => Signature,
  committer: () => Signature,
  sha: () => string,
  message: () => string,
  parents: () => Array<Oid>,
  treeId: () => Oid
}

export type Oid = {
  tostrS: () => string
}

export type Signature = {
  email: () => string,
  name: () => string,
  when: () => Time
}

export type Time = {
  time: () => number
}

export type AuthorObj = {
  date: string,
  name: string
}

export type BranchObj = {
  commit: CommitObj,
  name: string
}

export type CommitObj = {
  author: AuthorObj,
  sha: string,
  message: string
}

export type FileObj = {
  changes: number,
  filename: string,
  patch: string
}

export type IssueObj = {
  id: number,
  title: string,
  createdAt: string,
  createdBy: string,
  commentsCount: number
}

export type ParentObj = {
  sha: string
}

export type TagObj = {
  ref: string
}

export type TreeEntryObj = {
  lastCommit: CommitObj,
  path: string
}
