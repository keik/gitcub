// @flow

import gitBlobs from './git/blobs'
import gitCommits from './git/commits'
import gitRefs from './git/refs'
import gitTags from './git/tags'
import gitTrees from './git/trees'
import reposBranches from './repos/branches'
import reposCommits from './repos/commits'
import reposContents from './repos/contents'
import repos from './repos/repos'

export default [
  gitBlobs,
  gitCommits,
  gitRefs,
  gitTags,
  gitTrees,
  reposBranches,
  reposCommits,
  reposContents,
  repos
]
