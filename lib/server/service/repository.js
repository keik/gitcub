import path from 'path'
import Git from 'nodegit'

export function getCommits (config, repoName) {
  return Git.Repository.openBare(path.join(config.REPO_ROOT, repoName)).then(repo => {
    return repo.getBranchCommit('master')
  }).then(commit => {
    return new Promise((resolve, reject) => {
      const hist = commit.history()
      hist
        .on('end', commits => {
          resolve(commits.map(commit => ({
            id: commit.id().tostrS(),
            date: commit.date(),
            body: commit.body(),
            message: commit.message()
          })))
        })
        .on('error', err => {
          reject(err)
        })
      hist.start()
    })
  })
}

export function getEntries (config, repoName) {
  return Git.Repository.openBare(path.join(config.REPO_ROOT, repoName)).then(repo => {
    return repo.getBranchCommit('master')
  }).then(commit => {
    return commit.getTree()
  }).then(tree => {
    const entries = tree.entries()
    return entries.map(entry => entry.name())
  })
}
