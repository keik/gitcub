import { Router } from 'express'
import fs from 'fs'
import { merge } from 'lodash'
import { join } from 'path'
import Git, { Diff, TreeEntry } from 'nodegit'
import { parse } from 'url'

import config from '../../../../../config.json'
import { genAPIStr } from '../../../../share/utils'
import {
  API_BRANCHES,
  API_TAGS,
  API_GIT_REPOS,
  API_GIT_COMMITS,
  API_GIT_TREES,
  API_GIT_BLOBS,
  API_REPOS_COMMITS,
  API_REPOS_CONTENTS
} from '../../../../share/constants/api'

import * as RepositoryService from '../../../service/repository'

const { HOST, PORT } = config

export default new Router()
  .post(API_GIT_REPOS, (req, res) => {
    const config = req.app.get('config')
    const { name, __owner } = req.body  // TODO unparameterize __owner retrieving authorization
    if (name == null) {
      res.status(400).end('"name" is requred')
      return
    }

    const repoPath = join(config.REPO_ROOT, __owner, name)
    if (fs.existsSync(repoPath)) {
      res.status(409).end('repositoriy of specified name already exists')
      return
    }

    Git.Repository.init(repoPath, 1)
      .then((repo) => {
        res.status(201).end('new repository was created')
      })
      .catch((err) => {
        res.status(503).end(`error ${err.toString()}`)
      })
  })

  .get(API_BRANCHES, (req, res) => {
    const config = req.app.get('config')
    const owner = req.params.owner
    const repo = req.params.repo
    RepositoryService.getBranches(config, owner, repo)
      .then((branches) => {
        res.json(branches)
      })
      .catch((err) => {
        console.error(err)
        res.status(503).end('503')
      })
  })

  .get(API_GIT_COMMITS, (req, res) => {
    const config = req.app.get('config')
    const { owner, repo, sha } = req.params
    const repoPath = join(config.REPO_ROOT, owner, repo)
    let _repo
    let _gcommit
    Git.Repository.openBare(repoPath)
      .then(repo => (_repo = repo).getReference(sha))
      .then(ref => ref.target())
      .catch(err => sha)
      .then(sha => _repo.getCommit(sha))
      .then(commit => {
        res.json(convertCommitToGitCommitObject(commit, owner, repo))
      })
      .catch((err) => {
        console.error(err)
        res.status(503).end('503')
      })
  })

  .get(API_GIT_TREES, (req, res) => {
    const config = req.app.get('config')
    const { url } = req
    const { owner, repo, sha='master' } = req.params
    const withLastCommit = req.query.last_commit

    let _repo
    let _commit
    return Git.Repository.openBare(join(config.REPO_ROOT, owner, repo))
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
                      lastCommit: convertCommitToGitCommitObject(lastCommit, repo, owner),
                    })
                  })
                  .catch(reject)
              })
            }))
            .then(withCommit=> merge(trees, {tree: withCommit}))
        }
        return trees
      })
      .then((entries) => {
        res.json(entries)
      })
      .catch((err) => {
        console.error(err)
        res.status(503).end('503')
      })
  })

  .get(API_GIT_BLOBS, (req, res) => {
    const config = req.app.get('config')
    const { url, params: { owner, repo, sha } } = req
    const path = req.params[0].replace(/^\//, '')
    RepositoryService.getBlob(url, config, owner, repo, sha, path)
      .then((blob) => {
        const content = blob.toString()
        res.json({
          bytes: blob.rawsize(),
          content,
          lines: content.match(/\n/g).length,
          sha: blob.id().tostrS(),
        })
      })
      .catch((err) => {
        console.error(new Error(err))
        res.status(503).end('503')
      })
  })

  .get(API_TAGS, (req, res) => {
    const config = req.app.get('config')
    const owner = req.params.owner
    const repo = req.params.repo
    RepositoryService.getTags(config, owner, repo)
      .then((tags) => {
        res.json(tags)
      })
      .catch((err) => {
        console.error(err)
        res.status(503).end('503')
      })
  })

// Repositories API

  .get(API_REPOS_COMMITS, (req, res) => {
    const config = req.app.get('config')
    const { owner, repo, sha } = req.params
    const { sha: from_sha='master' } = req.query
    const repoPath = join(config.REPO_ROOT, owner, repo)
    let _repo
    Git.Repository.open(repoPath)
      .then(repo => (_repo = repo).getReference(sha || from_sha))
      .then(ref => ref.target())
      .catch(err => sha)
      .then(sha => _repo.getCommit(sha))
      .then(commit => {
        if (sha) {
          // single commit with patches
          const reposCommitObj = convertCommitToReposCommitObject(commit, owner, repo)
          const files = []
          const stats = {
            total: 0,
            additions: 0,
            deletions: 0,
          }
          commit.getDiff().then(diffs =>
            Promise.all(diffs.map(diff =>
              diff.findSimilar().then(() =>
                diff.patches().then(patches =>
                  Promise.all(patches.map(patch => {
                    const newFile = patch.newFile()
                    const oldFile = patch.oldFile()
                    const filename = newFile.path()
                    const status = patch.status()
                    const filesha = status === Diff.DELTA.DELETED ? oldFile.id().tostrS() : newFile.id().tostrS()
                    const commitsha = status === Diff.DELTA.DELETED ? reposCommitObj.parents[0] && reposCommitObj.parents[0].sha : sha
                    const { total_additions: additions, total_deletions: deletions } = patch.lineStats()
                    return patch.hunks().then(hunks =>
                      Promise.all(hunks.map(hunk => {
                        return hunk.lines().then(lines => {
                          const patchText = hunk.header() + lines.map(line => (String.fromCharCode(line.origin()) + line.content())).join('').replace(/\n$/, '')
                          const file = {
                            sha: filesha,
                            filename,
                            status: convertPatchStatus(status),
                            additions,
                            deletions,
                            changes: additions + deletions,
                            blob_url: `http://${HOST}:${PORT}/${owner}/${repo}/blob/${commitsha}/${filename}`,
                            raw_url: `http://${HOST}:${PORT}/${owner}/${repo}/raw/${commitsha}/${filename}`,
                            contents_url: `http://${HOST}:${PORT}/repos/${owner}/${repo}/contents/${filename}?ref=${commitsha}`,
                            patch: patchText,
                            previous_filename: status === Diff.DELTA.RENAMED ? patch.oldFile().path() : undefined,
                          }

                          if (files.some(f => f.filename === filename)) {
                            files.find(f => f.filename === filename).patch += '\n' + patchText
                          } else {
                            files.push(file)
                            stats.total += additions + deletions
                            stats.additions += additions
                            stats.deletions += deletions
                          }
                        })
                      }))
                    )
                  }))
                )
              ))
            )
          )
            .then(() => res.json(merge(reposCommitObj, {files, stats})))
            .catch(err => {
              console.error(err)
              res.status(503).send('503')
            })
        } else {
          commit.history()
            .on('end', commits => {
              res.json(commits.map(commit => (convertCommitToReposCommitObject(commit, owner, repo))))
            })
            .on('error', err => {
              console.error(err)
              res.status(503).end('503')
            })
            .start()
        }
      })
  })

  .get(API_REPOS_CONTENTS, (req, res) => {
    const config = req.app.get('config')
    const { params: { owner, repo, 0: path }, query: { ref='master' }, url } = req
    const { pathname, search } = parse(url)
    const pathname_ns = pathname.replace(/\/$/, '')
    const repoPath = join(config.REPO_ROOT, owner, repo)

    function processFileEntry(entry) {
      return entry.getBlob()
        .then(blob => {
          return res.json({
            content: blob.toString(),
            // "download_url": "https://raw.githubusercontent.com/octokit/octokit.rb/master/README.md",
            // "encoding": "base64",
            // "git_url": "https://api.github.com/repos/octokit/octokit.rb/git/blobs/3d21ec53a331a6f037a91c368710b99387d012c1",
            // "html_url": "https://github.com/octokit/octokit.rb/blob/master/README.md",
            name: entry.name(),
            path: entry.path(),
            sha: entry.sha(),
            size: blob.rawsize(),
            type: convertType(blob.filemode()),
            url: `${pathname_ns}${search || ''}`
            // "_links": {
            //   "git": "https://api.github.com/repos/octokit/octokit.rb/git/blobs/3d21ec53a331a6f037a91c368710b99387d012c1",
            //   "self": "https://api.github.com/repos/octokit/octokit.rb/contents/README.md",
            //   "html": "https://github.com/octokit/octokit.rb/blob/master/README.md"
            // },
          })
        })
    }

    function processTree(tree) {
      const entries = tree.entries()
      return res.json(entries.map(e => ({
        // "download_url": "https://raw.githubusercontent.com/octokit/octokit.rb/master/lib/octokit.rb",
        // "git_url": "https://api.github.com/repos/octokit/octokit.rb/git/blobs/fff6fe3a23bf1c8ea0692b4a883af99bee26fd3b",
        // "html_url": "https://github.com/octokit/octokit.rb/blob/master/lib/octokit.rb",
        name: e.name(),
        path: e.path(),
        sha: e.sha(),
        size: (e.rawsize && e.rawsize()) || 0,
        type: convertType(e.filemode()),
        url: `${pathname_ns}/${e.name()}${search || ''}`
        // "_links": {
        //   "self": "https://api.github.com/repos/octokit/octokit.rb/contents/lib/octokit.rb",
        //   "git": "https://api.github.com/repos/octokit/octokit.rb/git/blobs/fff6fe3a23bf1c8ea0692b4a883af99bee26fd3b",
        //   "html": "https://github.com/octokit/octokit.rb/blob/master/lib/octokit.rb"
        // },
      })))
    }

    let _repo
    Git.Repository.openBare(repoPath)
      .then(repo => (_repo = repo).getReference(ref))
      .then(ref => ref.target())
      .catch(err => ref)
      .then(ref => _repo.getCommit(ref))
      .then(commit => path ?
        commit.getEntry(path)
          .then(entry => entry.isTree() ?
            entry.getTree().then(processTree) :
            processFileEntry(entry)
          ) :
        commit.getTree()
          .then(processTree))
      .catch((err) => {
        console.error(err)
        res.status(503).end('503')
      })
  })

function convertType(type) {
  switch(type) {
    case TreeEntry.FILEMODE.TREE:
      return 'dir'
    case TreeEntry.FILEMODE.EXECUTABLE:
    case TreeEntry.FILEMODE.BLOB:
      return 'file'
    case TreeEntry.FILEMODE.LINK:
    case TreeEntry.FILEMODE.COMMIT:
    case TreeEntry.FILEMODE.UNREADABLE:
    default:
      return 'unknown'
  }
}

function convertPatchStatus(status) {
  switch(status) {
    case Diff.DELTA.ADDED:
      return 'added'
    case Diff.DELTA.DELETED:
      return 'removed'
    case Diff.DELTA.MODIFIED:
      return 'modified'
    case Diff.DELTA.RENAMED:
      return 'renamed'
    case Diff.DELTA.COPIED:
      return 'copied'
    default:
      return 'unknown'
  }
}

function convertCommitToGitCommitObject(commit, owner, repo) {
  const author = commit.author()
  const committer = commit.committer()
  return {
    author: {
      name: author.name(),
      email: author.email(),
      date: new Date(author.when().time() * 1000).toISOString(),
    },
    committer: {
      name: committer.name(),
      email: committer.email(),
      date: new Date(committer.when().time() * 1000).toISOString(),
    },
    message: commit.message(),
    parents: commit.parents().map(oid => oid.tostrS()).map(sha => ({
      url: genAPIStr(API_GIT_COMMITS, {owner, repo, sha}),
      sha,
    })),
    sha: commit.sha(),
    tree: {
      url: genAPIStr(API_GIT_TREES, {owner, repo, sha: commit.treeId().tostrS()}),
      sha: commit.treeId().tostrS(),
    },
    url: genAPIStr(API_GIT_COMMITS, {owner, repo, sha: commit.sha()}),
  }
}

function convertCommitToReposCommitObject(commit, owner, repo, withStats) {
  return {
    commit: convertCommitToGitCommitObject(commit, owner, repo),
    html_url: genAPIStr('/:owner/:repo/commit/:sha', {owner, repo, sha: commit.sha()}),
    parents: commit.parents().map(oid => oid.tostrS()).map(sha => ({
      url: `${genAPIStr(API_REPOS_COMMITS, {owner, repo})}/${sha}`,
      sha,
    })),
    sha: commit.sha(),
    url: `${genAPIStr(API_REPOS_COMMITS, {owner, repo})}/${commit.sha()}`,
  }
}
