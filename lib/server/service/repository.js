import { join } from 'path'
import Git from 'nodegit'

export function getBranches(config, user, repo) {
  return Git.Repository.openBare(join(config.REPO_ROOT, user, repo))
    .then(_repo => _repo.getReferences(Git.Reference.TYPE.LISTALL))
    .then(references => references
      .filter(ref => ref.isBranch())
      .map(ref => ref.name().split('/').pop()))
}

export function getTags(config, user, repo) {
  return Git.Repository.openBare(join(config.REPO_ROOT, user, repo))
    .then(_repo => _repo.getReferences(Git.Reference.TYPE.LISTALL))
    .then(references => references
      .filter(ref => ref.isTag())
      .map(ref => ref.name().split('/').pop()))
}

export function getCommits(config, user, repo, branch) {
  return Git.Repository.openBare(join(config.REPO_ROOT, user, repo))
    .then(_repo => _repo.getBranchCommit(branch))
    .then(commit => new Promise((resolve, reject) => commit
      .history()
      .on('end', commits => resolve(commits.map(_commit => ({
        id: _commit.id().tostrS(),
        date: _commit.date().toISOString(),
        body: _commit.body(),
        message: _commit.message(),
      }))))
      .on('error', err => reject(err))
      .start()))
}

export function getBlob(url, config, owner, repo, sha, path) {
  let _repo
  const repoPath = join(config.REPO_ROOT, owner, repo)
  const getBlobFromSha = () =>
    Git.Repository.openBare(repoPath)
    .then(repo => repo.getBlob(sha))
  const getBlobFromCommitAndPath = () =>
    Git.Repository.openBare(repoPath)
    .then(repo => (_repo = repo).getReference(sha))
    .then(ref => ref.target())
    .catch(err => sha)
    .then(sha => _repo.getCommit(sha))
    .then(commit => commit.getEntry(path))
    .then(entry => entry.getBlob())
  return path ?
    getBlobFromCommitAndPath() :
    getBlobFromSha()
}
