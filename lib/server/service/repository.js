import path from 'path'
import Git from 'nodegit'

export function getBranches(config, user, repo) {
  return Git.Repository.openBare(path.join(config.REPO_ROOT, repo))
    .then(_repo => _repo.getReferences(Git.Reference.TYPE.LISTALL))
    .then(references => references
          .filter(ref => ref.isBranch())
          .map(ref => ref.name().split('/').pop()))
}

export function getTags(config, user, repo) {
  return Git.Repository.openBare(path.join(config.REPO_ROOT, repo))
    .then(_repo => _repo.getReferences(Git.Reference.TYPE.LISTALL))
    .then(references => references
          .filter(ref => ref.isTag())
          .map(ref => ref.name().split('/').pop()))
}

export function getCommits(config, user, repo, branch) {
  return Git.Repository.openBare(path.join(config.REPO_ROOT, repo))
    .then(_repo => _repo.getBranchCommit(branch))
    .then(commit => new Promise((resolve, reject) => commit.history()
                                .on('end', commits => resolve(commits.map(_commit => ({
                                  id: _commit.id().tostrS(),
                                  date: _commit.date().toISOString(),
                                  body: _commit.body(),
                                  message: _commit.message(),
                                }))))
                                .on('error', err => reject(err))
                                .start()))
}

export function getEntries(config, user, repo, branch) {
  return Git.Repository.openBare(path.join(config.REPO_ROOT, repo))
    .then(_repo => _repo.getBranchCommit(branch))
    .then(commit => commit.getTree())
    .then(tree => new Promise((resolve, reject) => tree.walk()
                              .on('end', entries => resolve(entries.map(e => e.path())))
                              .on('error', err => reject(err))
                              .start()))
}

export function getContent(config, user, repo, branch, filepath) {
  return Git.Repository.openBare(path.join(config.REPO_ROOT, repo))
    .then(rep => rep.getBranchCommit(branch))
    .then(commit => commit.getTree())
    .then(tree => tree.getEntry(filepath))
    .then(entry => entry.getBlob())
    .then(blob => blob.toString())
}
