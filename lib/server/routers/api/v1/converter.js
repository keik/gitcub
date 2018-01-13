// @flow

import { genAPIStr } from '../../../../share/utils'
import {
  API_GIT_COMMITS,
  API_GIT_TREES,
  API_REPOS_COMMITS
} from '../../../../share/constants/api'

import type { Commit } from '../../../../types/nodegit'

export function convertCommitToReposCommitObject(
  commit: Commit,
  owner: string,
  repo: string
) {
  return {
    commit: convertCommitToGitCommitObject(commit, owner, repo),
    html_url: genAPIStr('/:owner/:repo/commit/:sha', {
      owner,
      repo,
      sha: commit.sha()
    }),
    parents: commit
      .parents()
      .map(oid => oid.tostrS())
      .map(sha => ({
        url: `${genAPIStr(API_REPOS_COMMITS, { owner, repo })}/${sha}`,
        sha
      })),
    sha: commit.sha(),
    url: `${genAPIStr(API_REPOS_COMMITS, { owner, repo })}/${commit.sha()}`
  }
}

export function convertCommitToGitCommitObject(
  commit: Commit,
  owner: string,
  repo: string
) {
  const author = commit.author()
  const committer = commit.committer()
  return {
    author: {
      name: author.name(),
      email: author.email(),
      date: new Date(author.when().time() * 1000).toISOString()
    },
    committer: {
      name: committer.name(),
      email: committer.email(),
      date: new Date(committer.when().time() * 1000).toISOString()
    },
    message: commit.message(),
    parents: commit
      .parents()
      .map(oid => oid.tostrS())
      .map(sha => ({
        url: genAPIStr(API_GIT_COMMITS, { owner, repo, sha }),
        sha
      })),
    sha: commit.sha(),
    tree: {
      url: genAPIStr(API_GIT_TREES, {
        owner,
        repo,
        sha: commit.treeId().tostrS()
      }),
      sha: commit.treeId().tostrS()
    },
    url: genAPIStr(API_GIT_COMMITS, { owner, repo, sha: commit.sha() })
  }
}
