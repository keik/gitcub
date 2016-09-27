import path from 'path'
import Git from 'nodegit'

export function getBranches (config, user, repo) {
  return Git.Repository.openBare(path.join(config.REPO_ROOT, repo)).then(repo => {
    return repo.getReferences(Git.Reference.TYPE.LISTALL)
  }).then(references => {
    return references
      .filter(ref => ref.isBranch())
      .map(ref => ref.name().split('/').pop())
  })
}

export function getTags (config, user, repo) {
  return Git.Repository.openBare(path.join(config.REPO_ROOT, repo)).then(repo => {
    return repo.getReferences(Git.Reference.TYPE.LISTALL)
  }).then(references => {
    return references
      .filter(ref => ref.isTag())
      .map(ref => ref.name().split('/').pop())
  })
}

export function getCommits (config, user, repo, branch) {
  return Git.Repository.openBare(path.join(config.REPO_ROOT, repo)).then(repo => {
    return repo.getBranchCommit(branch)
  }).then(commit => {
    return new Promise((resolve, reject) => {
      commit.history()
        .on('end', commits => {
          resolve(commits.map(commit => ({
            id: commit.id().tostrS(),
            date: commit.date().toISOString(),
            body: commit.body(),
            message: commit.message()
          })))
        })
        .on('error', err => {
          reject(err)
        })
        .start()
    })
  })
}

export function getEntries (config, user, repo, branch) {
  return Git.Repository.openBare(path.join(config.REPO_ROOT, repo)).then(repo => {
    return repo.getBranchCommit(branch)
  }).then(commit => {
    return commit.getTree()
  }).then(tree => {
    return new Promise((resolve, reject) => {
      tree.walk()
        .on('end', entries => {
          resolve(entries.map(e => e.path()))
        })
        .on('error', err => {
          reject(err)
        })
        .start()
    })
  })
}

export function getContent (config, user, repo, branch, filepath) {
  return Git.Repository.openBare(path.join(config.REPO_ROOT, repo)).then(repo => {
    return repo.getBranchCommit(branch)
  }).then(commit => {
    return commit.getTree()
  }).then(tree => {
    return tree.getEntry(filepath)
  }).then(entry => {
    return entry.getBlob()
  }).then(blob => blob.toString())
}
