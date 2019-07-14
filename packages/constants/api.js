// @flow

// Git API
module.exports.API_GIT_BLOBS = '/api/v1/repos/:owner/:repo/git/blobs/:sha*'
module.exports.API_GIT_COMMITS = '/api/v1/repos/:owner/:repo/git/commits/:sha'
module.exports.API_GIT_REFS = '/api/v1/repos/:owner/:repo/git/refs/?*'
module.exports.API_GIT_TAGS = '/api/v1/repos/:owner/:repo/git/tags/:sha'
module.exports.API_GIT_TREES = '/api/v1/repos/:owner/:repo/git/trees(/:sha)?'

// Repositories API
module.exports.API_REPOS = {
  LOGIN_USERS: '/api/v1/user/repos',
  PUBLIC: '/api/v1/repositories',
  USERS: '/api/v1/users/:owner/repos'
}
module.exports.API_REPOS_BRANCHES = '/api/v1/repos/:owner/:repo/branches'
module.exports.API_REPOS_COMMITS = '/api/v1/repos/:owner/:repo/commits(/:sha)?'
module.exports.API_REPOS_CONTENTS = '/api/v1/repos/:owner/:repo/contents/?*'

// Users API
module.exports.API_USERS = '/api/v1/users/:username'
