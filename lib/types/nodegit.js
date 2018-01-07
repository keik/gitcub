// @flow

export type Commit = {
  author: Author
}

export type Author = {
  date: string,
  name: string
}

export type Branch = {
  commit: Commit,
  name: string
}
