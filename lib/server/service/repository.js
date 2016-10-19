import path from 'path'
import Git from 'nodegit'

export function getBranches(config, user, repo) {
  return Git.Repository.openBare(path.join(config.REPO_ROOT, user, repo))
            .then(_repo => _repo.getReferences(Git.Reference.TYPE.LISTALL))
            .then(references => references
              .filter(ref => ref.isBranch())
              .map(ref => ref.name().split('/').pop()))
}

export function getTags(config, user, repo) {
  return Git.Repository.openBare(path.join(config.REPO_ROOT, user, repo))
            .then(_repo => _repo.getReferences(Git.Reference.TYPE.LISTALL))
            .then(references => references
              .filter(ref => ref.isTag())
              .map(ref => ref.name().split('/').pop()))
}

export function getCommits(config, user, repo, branch) {
  return Git.Repository.openBare(path.join(config.REPO_ROOT, user, repo))
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

export function getEntries(config, user, repo, branch) {
  let grepo
  let gcommit
  return Git.Repository.openBare(path.join(config.REPO_ROOT, user, repo))
            .then(r => (grepo = r).getBranchCommit(branch))
            .then(c => (gcommit = c).getTree())
            .then(tree => new Promise((resolve, reject) => {
              return tree.walk()
                         .on('end', entries => resolve(entries.map(e => e.path())))
                         .on('error', err => reject(err))
                         .start()
            }))
            .then(paths => {
              return Promise.all(paths.map(path => {
                return new Promise((resolve, reject) => {
                  const walker = grepo.createRevWalk()
                  walker.push(gcommit.sha())
                  walker.sorting(Git.Revwalk.SORT.Time)
                  walker.fileHistoryWalk(path, 10).then(histories => { // TODO param
                    const lastCommit = histories[0].commit
                    resolve({
                      path,
                      lastCommit: {
                        message: lastCommit.message(),
                        date: lastCommit.date().toISOString(),
                      }
                    })
                  })
                })
              }))
            })
}

export function getContent(config, user, repo, branch, filepath) {
  return Git.Repository.openBare(path.join(config.REPO_ROOT, user, repo))
            .then(rep => rep.getBranchCommit(branch))
            .then(commit => commit.getTree())
            .then(tree => tree.getEntry(filepath))
            .then(entry => entry.getBlob())
            .then(blob => blob.toString())
}
