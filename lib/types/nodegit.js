// @flow

export type AuthorObj = {
  date: string,
  name: string
}

export type BranchObj = {
  commit: CommitObj,
  name: string
}

export type Commit = {
  // author: Author,
  sha: () => string,
  message: string
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
