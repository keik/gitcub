// @flow

import axios from 'axios'
import debug from 'debug'
import React from 'react'
import { connect } from 'react-redux'
import { Route, IndexRoute } from 'react-router'

import * as RepositoryActions from './ducks/repository'
import App from './components/App'
import Login from './components/Login'
import Home from './components/Home'
import New from './components/New'
import Repository from './components/repository'
import RepoHome from './components/repository/Home'
import RepoTree from './components/repository/Tree'
import RepoFileContent from './components/repository/FileContent'
import RepoCommit from './components/repository/Commit'
import RepoCommits from './components/repository/Commits'
import RepoBranches from './components/repository/Branches'
import RepoIssues from './components/repository/Issues'
import RepoProjects from './components/repository/Projects'
import RepoWiki from './components/repository/Wiki'
import RepoPulse from './components/repository/Pulse'
import RepoGraphs from './components/repository/Graphs'
import RepoSettings from './components/repository/Settings'
import User from './components/user'
import { genAPIStr } from './utils'
import config from '../../config'
import { API_GIT_REFS, API_REPOS_COMMITS } from './constants/api'

const d = debug('keik:gh:routes')

let { HOST, PORT } = config.env[process.env.NODE_ENV || 'development']
PORT = process.env.PORT || PORT
const ROOT_URL = typeof window === 'undefined' ? `http://${HOST}:${PORT}` : ''

/**
 * TODO compatible connect
 * @param [array|object] options.fetchOpts
 * @param [function(state)] options.fetchOpts.isRequired - fetching required or not. `state` is passed from react-redux
 * @param {function(res)} options.fetchOpts.merge - merge fetch data to state.
 * @param {function(params)} options.fetchOpts.uri - URI to fetch data. `params` is passed from react-router
 */
// $FlowFixMe
function connectWithInitialFetch() {
  return Component => (nextState, cb) => {
    d('connectWithInitialFetch')

    const mapStateToProps = arguments[0]
    const opts = arguments[arguments.length - 1]
    let fetchOpts = opts.fetchOpts
    if (fetchOpts == null) {
      d('no fetchOpts specified')
      return cb(null, connect(mapStateToProps)(Component))
    }

    fetchOpts = Array.isArray(fetchOpts) ? fetchOpts : [fetchOpts]
    const store = opts.store

    let state
    try {
      state = mapStateToProps(store.getState(), nextState)
    } catch (e) {
      state = undefined
    }

    const requiredFetchOpts = fetchOpts.filter(f => f.isRequired(state))
    if (requiredFetchOpts.length === 0) {
      d('no need to fetch')
      return cb(null, connect(mapStateToProps)(Component))
    }

    d('fetch props...')
    store.dispatch(RepositoryActions.fetching())
    fetcher(nextState, requiredFetchOpts)
      .then(data => {
        store.dispatch(RepositoryActions.fetchSuccess([...data]))
        cb(null, connect(...arguments)(Component))
      })
      .catch(err => {
        console.error(Error(err))
        store.dispatch(RepositoryActions.fetchFailure(err.toString()))
        cb(null, connect(...arguments)(Component))
      })
  }
}

function fetcher(nextState, fetchOpts) {
  return Promise.all(
    fetchOpts.map(fopt =>
      axios
        .get(fopt.uri(nextState.params))
        .then(res => fopt.merge(res.data))
        .catch(err => {
          console.error(new Error(err))
          return fopt.merge(null)
        })
    )
  )
}

// $FlowFixMe
export default function Routes(store) {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/new" component={New} />
      <Route path="/:owner" component={User} />
      <Route path="/:owner/:repo" component={Repository}>
        <IndexRoute
          getComponent={connectWithInitialFetch(state => state.repository, {
            fetchOpts: [
              {
                isRequired: state => !state.branches,
                merge: data => ({ branches: data || [] }),
                uri: ({ repo, owner }) =>
                  `${ROOT_URL}/api/v1/repos/${owner}/${repo}/branches`
              },
              {
                isRequired: state => !state.commits,
                merge: data => ({ commits: data || [] }),
                uri: ({ repo, owner }) =>
                  `${ROOT_URL}/api/v1/repos/${owner}/${repo}/commits`
              },
              {
                isRequired: state =>
                  !state.entries || state.entries.length === 1,
                merge: data => ({ entries: (data && data.tree) || [] }),
                uri: ({ repo, owner }) =>
                  `${ROOT_URL}/api/v1/repos/${owner}/${repo}/git/trees?last_commit=1`
              },
              {
                isRequired: state => !state.tags,
                merge: data => ({ tags: data || [] }),
                uri: ({ repo, owner }) =>
                  `${genAPIStr(API_GIT_REFS, { owner, repo, '*': 'tags' })}`
              }
            ],
            store
          })(RepoHome)}
        />
        <Route path="blob/:branch/*" component={RepoFileContent} />
        <Route
          path="commit/:sha"
          getComponent={connectWithInitialFetch(
            state => state.repository.commit,
            {
              fetchOpts: {
                isRequired: () => true,
                merge: data => ({ commit: data || [] }), // TODO cache to parent `commits` in state
                uri: ({ repo, owner, sha }) =>
                  genAPIStr(API_REPOS_COMMITS, { owner, repo, sha })
              },
              store
            }
          )(RepoCommit)}
        />
        <Route path="commits" component={RepoCommits} />
        <Route path="branches" component={RepoBranches} />
        <Route path="issues" component={RepoIssues} />
        <Route path="pulls" component={RepoIssues} />
        <Route path="projects" component={RepoProjects} />
        <Route
          path="tree/:tree"
          getComponent={connectWithInitialFetch(state => state.repository, {
            fetchOpts: [
              {
                isRequired: state => !state.branches,
                merge: data => ({ branches: data || [] }),
                uri: ({ repo, owner }) =>
                  `${ROOT_URL}/api/v1/repos/${owner}/${repo}/branches`
              },
              {
                isRequired: state => !state.commits,
                merge: data => ({ commits: data || [] }),
                uri: ({ repo, owner, tree }) =>
                  `${ROOT_URL}/api/v1/repos/${owner}/${repo}/commits?sha=${tree}`
              },
              {
                isRequired: state =>
                  !state.entries || state.entries.length === 1,
                merge: data => ({ entries: data.tree || [] }),
                uri: ({ repo, owner, tree }) =>
                  `${ROOT_URL}/api/v1/repos/${owner}/${repo}/git/trees/${tree}?last_commit=1`
              },
              {
                isRequired: state => !state.tags,
                merge: data => ({ tags: data || [] }),
                uri: ({ repo, owner }) =>
                  `${genAPIStr(API_GIT_REFS, { owner, repo, '*': 'tags' })}`
              }
            ],
            store
          })(RepoHome)}
        />
        <Route
          path="tree/:tree/*"
          getComponent={connectWithInitialFetch(state => state.repository, {
            fetchOpts: [
              {
                isRequired: state => !state.branches,
                merge: data => ({ branches: data || [] }),
                uri: ({ repo, owner }) =>
                  `${ROOT_URL}/api/v1/repos/${owner}/${repo}/branches`
              },
              {
                isRequired: state => !state.commits,
                merge: data => ({ commits: data || [] }),
                uri: ({ repo, owner, tree }) =>
                  `${ROOT_URL}/api/v1/repos/${owner}/${repo}/commits?sha=${tree}`
              },
              {
                isRequired: state => !state.entries,
                merge: data => ({ entries: data.tree || [] }),
                uri: ({ repo, owner, tree }) =>
                  `${ROOT_URL}/api/v1/repos/${owner}/${repo}/git/trees/${tree}?last_commit=1`
              },
              {
                isRequired: state => !state.tags,
                merge: data => ({ tags: data || [] }),
                uri: ({ repo, owner }) =>
                  `${genAPIStr(API_GIT_REFS, { owner, repo, '*': 'tags' })}`
              }
            ],
            store
          })(RepoTree)}
        />

        <Route path="wiki" component={RepoWiki} />
        <Route path="pulse" component={RepoPulse} />
        <Route path="graphs" component={RepoGraphs} />
        <Route path="settings" component={RepoSettings} />
      </Route>
    </Route>
  )
}
