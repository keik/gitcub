// Git API
export const API_GIT_BLOBS      = '/api/v1/repos/:owner/:repo/git/blobs/:sha*'
export const API_GIT_COMMITS    = '/api/v1/repos/:owner/:repo/git/commits/:sha'
export const API_GIT_REFS       = '/api/v1/repos/:owner/:repo/git/refs/?*'
export const API_GIT_TAGS       = '/api/v1/repos/:owner/:repo/git/tags/:sha'
export const API_GIT_TREES      = '/api/v1/repos/:owner/:repo/git/trees(/:sha)?'

// Repositories API
export const API_REPOS          = '/api/v1/user/repos'
export const API_REPOS_BRANCHES = '/api/v1/repos/:owner/:repo/branches'
export const API_REPOS_COMMITS  = '/api/v1/repos/:owner/:repo/commits(/:sha)?'
export const API_REPOS_CONTENTS = '/api/v1/repos/:owner/:repo/contents/?*'
