// TODO redesign
export const API_BRANCHES = '/api/v1/repos/:owner/:repo/branches'
export const API_TAGS = '/api/v1/repos/:owner/:repo/tags'

// Git API
export const API_GIT_REPOS = '/api/v1/user/repos'
export const API_GIT_COMMITS = '/api/v1/repos/:owner/:repo/git/commits/:sha'
export const API_GIT_TREES = '/api/v1/repos/:owner/:repo/git/trees(/:sha)?'
export const API_GIT_BLOBS = '/api/v1/repos/:owner/:repo/git/blobs/:sha*'

// Repositories API
export const API_REPOS_COMMITS = '/api/v1/repos/:owner/:repo/commits(/:sha)?'
export const API_REPOS_CONTENTS = '/api/v1/repos/:owner/:repo/contents/?*'
