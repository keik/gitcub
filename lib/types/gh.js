// @flow

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
