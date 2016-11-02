import axios from 'axios'
import debug from 'debug'
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { connect } from 'react-redux'

import * as RepositoryActions from './actions/repository-actions'

import App from './components/app'
import Home from './components/home'
import Repository from './components/repository'
import RepoHome from './components/repository/home'
import RepoTree from './components/repository/tree'
import RepoFileContent from './components/repository/file-content'
import RepoCommit from './components/repository/commit'
import RepoCommits from './components/repository/commits'
import RepoBranches from './components/repository/branches'
import RepoIssues from './components/repository/issues'
import RepoProjects from './components/repository/projects'
import RepoWiki from './components/repository/wiki'
import RepoPulse from './components/repository/pulse'
import RepoGraphs from './components/repository/graphs'
import RepoSettings from './components/repository/settings'
import User from './components/user'
import config from '../../config.json'
import { genAPIStr } from './utils'
import {
  API_GIT_BLOBS,
  API_GIT_COMMITS,
  API_GIT_REFS,
  API_GIT_TAGS,
  API_GIT_TREES,
  API_REPOS,
  API_REPOS_BRANCHES,
  API_REPOS_COMMITS,
  API_REPOS_CONTENTS
} from './constants/api'

const d = debug('keik:gh:routes')

let { HOST, PORT } = config.env[process.env.NODE_ENV]
PORT = process.env.PORT || PORT
const ROOT_URL = (typeof window === 'undefined') ? `http://${HOST}:${PORT}` : ''

/**
 * TODO compatible connect
 * @param [array|object] options.fetchOpts
 * @param [function(state)] options.fetchOpts.isRequired - fetching required or not. `state` is passed from react-redux
 * @param {function(res)} options.fetchOpts.merge - merge fetch data to state.
 * @param {function(params)} options.fetchOpts.uri - URI to fetch data. `params` is passed from react-router
 */
function connectWithInitialFetch() {
  return (Component) => (nextState, cb) => {
    d('connectWithInitialFetch')

    const mapStateToProps = arguments[0]
    const opts = arguments[arguments.length - 1]
    let fetchOpts = opts.fetchOpts
    if (fetchOpts == null) {
      d ('no fetchOpts specified')
      return cb(null, connect(mapStateToProps)(Component))
    }

    fetchOpts = Array.isArray(fetchOpts) ? fetchOpts : [fetchOpts]
    const store = opts.store

    let state
    try { state = mapStateToProps(store.getState(), nextState) }
    catch(e) { state = undefined }

    const requiredFetchOpts = fetchOpts.filter(f => f.isRequired(state))
    if (requiredFetchOpts.length === 0) {
      d ('no need to fetch')
      return cb(null, connect(mapStateToProps)(Component))
    }

    d('fetch props...')
    store.dispatch(RepositoryActions.fetching())
    fetcher(nextState, requiredFetchOpts)
      .then((data) => {
        store.dispatch(RepositoryActions.fetchSuccess([...data]))
        cb(null, connect(...arguments)(Component))
      })
      .catch((err) => {
        console.error(Error(err))
        store.dispatch(RepositoryActions.fetchFailure(err.toString()))
        cb(null, connect(...arguments)(Component))
      })
  }
}

function fetcher(nextState, fetchOpts) {
  return Promise
    .all(fetchOpts.map(fopt => axios
      .get(fopt.uri(nextState.params))
      .then(res => fopt.merge(res.data))
      .catch((err) => {
        console.error(new Error(err))
        return fopt.merge(null)
      })
    ))
}

export default (store) => (
  <Route path="/" component={connect(state => state)(App)}>
    <IndexRoute component={Home} />
    <Route path="/:owner"
      component={connect(state => state)(User)} />
    <Route path="/:owner/:repo" component={connect(state => ({repository: state.repository, fetched: state.fetched}))(Repository)}>
      <IndexRoute
        getComponent={connectWithInitialFetch(
            state => state.repository,
            {
              fetchOpts: [
                {
                  isRequired: (state) => (!state.branches),
                  merge: data => ({branches: data || []}),
                  uri: ({ repo, owner }) => `${ROOT_URL}/api/v1/repos/${owner}/${repo}/branches`,
                },
                {
                  isRequired: (state) => (!state.commits),
                  merge: data => ({commits: data || []}),
                  uri: ({ repo, owner }) => `${ROOT_URL}/api/v1/repos/${owner}/${repo}/commits`,
                },
                {
                  isRequired: (state) => (!state.entries || state.entries.length === 1),
                  merge: data => ({entries: data.tree || []}),
                  uri: ({ repo, owner }) => `${ROOT_URL}/api/v1/repos/${owner}/${repo}/git/trees?last_commit=1`,
                },
                {
                  isRequired: (state) => (!state.tags),
                  merge: data => ({tags: data || []}),
                  uri: ({ repo, owner, tree, splat: path }) => `${genAPIStr(API_GIT_REFS, {owner, repo, '*': 'tags'})}`,
                },
              ],
              store,
            }
          )(RepoHome)}
      />
      <Route path="blob/:branch/*"
        getComponent={connectWithInitialFetch(
            ({ repository }, { params: { splat: path } }) => repository.entries.find(e => e.path === path),
            {
              fetchOpts: {
                isRequired: (state) => (!state || !state.content),
                merge: data => ({entries: [data]}),
                uri: ({ repo, owner, branch, splat: path }) => `${ROOT_URL}/api/v1/repos/${owner}/${repo}/contents/${path}?ref=${branch}`,
              },
              store,
            }
          )(RepoFileContent)}
      />
      <Route path="commit/:sha"
        getComponent={connectWithInitialFetch(
            state => state.repository.commit,
            {
              fetchOpts: {
                isRequired: (state) => (true), // TODO retrieve from cache
                merge: data => ({commit: data || []}), // TODO cache to parent `commits` in state
                uri: ({ repo, owner, sha }) => genAPIStr(API_REPOS_COMMITS, {owner, repo, sha}),
              },
              store,
            }
          )(RepoCommit)} />
      <Route path="commits"
        getComponent={connectWithInitialFetch(
            state => state.repository,
            {
              fetchOpts: {
                isRequired: (state) => (!state.commits),
                merge: data => ({commits: data || []}),
                uri: ({ repo, owner }) => `${ROOT_URL}/api/v1/repos/${owner}/${repo}/commits`,
              },
              store,
            }
          )(RepoCommits)} />
      <Route path="branches"
        getComponent={connectWithInitialFetch(
            state => state.repository,
            {
              fetchOpts: {
                isRequired: (state) => (!state.branches),
                merge: data => ({branches: data || []}),
                uri: ({ repo, owner }) => `${ROOT_URL}/api/v1/repos/${owner}/${repo}/branches`,
              },
              store,
            }
          )(RepoBranches)} />
      <Route path="issues"
        component={RepoIssues} />
      <Route path="pulls"
        component={RepoIssues} />
      <Route path="projects"
        component={RepoProjects} />
      <Route path="tree/:tree"
        getComponent={connectWithInitialFetch(
            state => state.repository,
            {
              fetchOpts: [
                {
                  isRequired: (state) => (!state.branches),
                  merge: data => ({branches: data || []}),
                  uri: ({ repo, owner, tree }) => `${ROOT_URL}/api/v1/repos/${owner}/${repo}/branches`,
                },
                {
                  isRequired: (state) => (!state.commits),
                  merge: data => ({commits: data || []}),
                  uri: ({ repo, owner, tree }) => `${ROOT_URL}/api/v1/repos/${owner}/${repo}/commits`,
                },
                {
                  isRequired: (state) => (!state.entries || state.entries.length === 1),
                  merge: data => ({entries: data.tree || []}),
                  uri: ({ repo, owner, tree }) => `${ROOT_URL}/api/v1/repos/${owner}/${repo}/git/trees/${tree}?last_commit=1`,
                },
                {
                  isRequired: (state) => (!state.tags),
                  merge: data => ({tags: data || []}),
                  uri: ({ repo, owner, tree, splat: path }) => `${genAPIStr(API_GIT_REFS, {owner, repo, '*': 'tags'})}`,
                },
              ],
              store,
            }
          )(RepoHome)}
      />
      <Route path="tree/:tree/*"
        getComponent={connectWithInitialFetch(
            state => state.repository,
            {
              fetchOpts: [
                {
                  isRequired: (state) => (!state.branches),
                  merge: data => ({branches: data || []}),
                  uri: ({ repo, owner, tree, splat: path }) => `${ROOT_URL}/api/v1/repos/${owner}/${repo}/branches`,
                },
                {
                  isRequired: (state) => (!state.commits),
                  merge: data => ({commits: data || []}),
                  uri: ({ repo, owner, tree, splat: path }) => `${ROOT_URL}/api/v1/repos/${owner}/${repo}/commits`,
                },
                {
                  isRequired: (state) => (!state.entries),
                  merge: data => ({entries: data.tree || []}),
                  uri: ({ repo, owner, tree, splat: path }) => `${ROOT_URL}/api/v1/repos/${owner}/${repo}/git/trees/${tree}?last_commit=1`,
                },
                {
                  isRequired: (state) => (!state.tags),
                  merge: data => ({tags: data || []}),
                  uri: ({ repo, owner, tree, splat: path }) => `${genAPIStr(API_GIT_REFS, {owner, repo, '*': 'tags'})}`,
                },
              ],
              store,
            }
          )(RepoTree)}
      />

      <Route path="wiki"
        component={RepoWiki} />
      <Route path="pulse"
        component={RepoPulse} />
      <Route path="graphs"
        component={RepoGraphs} />
      <Route path="settings"
        component={RepoSettings} />
    </Route>
  </Route>
)
