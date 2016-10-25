import { join } from 'path'
import Git from 'nodegit'
import merge from 'lodash.merge'

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

export function getEntries(url, config, user, repo, sha='master', withLastCommit) {
  let _repo
  let _commit
  return Git.Repository.openBare(join(config.REPO_ROOT, user, repo))
    .then(repo => (_repo = repo).getReference(sha)) // get reference from branch name
    .then(ref => ref.target())
    .catch(err => sha)
    .then(sha => _repo.getCommit(sha)) // get commit from reference
    .then(commit => (_commit = commit).getTree())
    .then(tree => new Promise((resolve, reject) =>
      tree.walk()
      .on('end', resolve)
      .on('error', reject)
      .start()
    ))
    .then(tree => {
      const trees = {
        url,
        sha,
        tree: tree.map(entry => ({
          path: entry.path(),
          type: (type => {
            switch(type) {
              case Git.TreeEntry.FILEMODE.TREE:
                return 'tree'
              default:
                return 'blob'
            }
          })(entry.filemode()),
          sha: entry.sha(),
        })),
      }

      // retrieve last commit for each entries
      if (withLastCommit) {
        return Promise
          .all(tree.map(entry => {
            const path = entry.path()
            return new Promise((resolve, reject) => {
              const walker = _repo.createRevWalk()
              walker.push(_commit.sha())
              walker.sorting(Git.Revwalk.SORT.Time)
              walker.fileHistoryWalk(path, 10)
                .then(histories => { // TODO param
                  const lastCommit = histories[0].commit
                  resolve({
                    lastCommit: {
                      message: lastCommit.message(),
                      date: lastCommit.date().toISOString(),
                    }
                  })
                })
                .catch(reject)
            })
          }))
          .then(withCommit=> merge(trees, {tree: withCommit}))
      }
      return trees
    })
}

export function getBlob(url, config, owner, repo, sha, path) {
  let _repo
  const repoPath = join(config.REPO_ROOT, owner, repo)
  const getBlobFromSha = () =>
    Git.Repository.openBare(repoPath)
    .then(repo => repo.getBlob(sha))
    .then(blob => blob.toString())
  const getBlobFromCommitAndPath = () =>
    Git.Repository.openBare(repoPath)
    .then(repo => (_repo = repo).getReference(sha))
    .then(ref => ref.target())
    .catch(err => sha)
    .then(sha => _repo.getCommit(sha))
    .then(commit => commit.getEntry(path))
    .then(entry => entry.getBlob())
    .then(blob => blob.toString())
  return path ?
    getBlobFromCommitAndPath() :
    getBlobFromSha()
}
