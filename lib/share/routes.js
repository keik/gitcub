import axios from 'axios'
import debug from 'debug'
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { connect } from 'react-redux'

import * as RepositoryActions from './actions/repository-actions'

import App from './components/app'
import Home from './components/home'
import Repository from './components/repository'
import RepositoryContentEntries from './components/repository/contents/entries'
import RepositoryContentFileContent from './components/repository/contents/file-content'
import RepositoryContentCommits from './components/repository/contents/commits'
import RepositoryContentBranches from './components/repository/contents/branches'
import RepositoryContentIssues from './components/repository/contents/issues'
import RepositoryContentProjects from './components/repository/contents/projects'
import RepositoryContentWiki from './components/repository/contents/wiki'
import RepositoryContentPulse from './components/repository/contents/pulse'
import RepositoryContentGraphs from './components/repository/contents/graphs'
import RepositoryContentSettings from './components/repository/contents/settings'
import User from './components/user'

const d = debug('keik:gh:routes')

const host = (typeof window === 'undefined') ? 'http://localhost:3000' : ''

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
    const fetchOpts = Array.isArray(opts.fetchOpts) ? opts.fetchOpts : [opts.fetchOpts]
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
        console.error(err)
        store.dispatch(RepositoryActions.fetchFailure(err))
        cb(err, connect(mapStateToProps)(Component))
      })
  }
}

function fetcher(nextState, fetchOpts) {
  return Promise
    .all(fetchOpts.map(f => axios.get(f.uri(nextState.params)).then(f.merge)))
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
                  merge: res => ({branches: res.data}),
                  uri: ({ repo, owner }) => `${host}/api/v1/repos/${owner}/${repo}/branches`,
                },
                {
                  isRequired: (state) => (!state.commits),
                  merge: res => ({commits: res.data}),
                  uri: ({ repo, owner }) => `${host}/api/v1/repos/${owner}/${repo}/commits`,
                },
                {
                  isRequired: (state) => (!state.entries || state.entries.length === 1),
                  merge: res => ({entries: res.data.tree}),
                  uri: ({ branch, repo, owner }) => `${host}/api/v1/repos/${owner}/${repo}/git/trees/${branch ? branch : ''}?last_commit=1`,
                },
                {
                  isRequired: (state) => (!state.tags),
                  merge: res => ({tags: res.data}),
                  uri: ({ repo, owner }) => `${host}/api/v1/repos/${owner}/${repo}/tags`,
                },
              ],
              store,
            }
          )(RepositoryContentEntries)}
      />
      <Route path="blob/:branch/*"
        getComponent={connectWithInitialFetch(
            ({ repository }, { params: { splat: path } }) => repository.entries.find(e => e.path === path),
            {
              fetchOpts: {
                isRequired: (state) => (!state || !state.content),
                merge: res => ({entries: [res.data]}),
                uri: ({ repo, owner, branch, splat: path }) => `${host}/api/v1/repos/${owner}/${repo}/contents/${path}?ref=${branch}`,
              },
              store,
            }
          )(RepositoryContentFileContent)}
      />
      <Route path="commits"
        getComponent={connectWithInitialFetch(
            state => state.repository,
            {
              fetchOpts: {
                isRequired: (state) => (!state.commits),
                merge: res => ({commits: res.data}),
                uri: ({ repo, owner }) => `${host}/api/v1/repos/${owner}/${repo}/commits`,
              },
              store,
            }
          )(RepositoryContentCommits)} />
      <Route path="branches"
        getComponent={connectWithInitialFetch(
            state => state.repository,
            {
              fetchOpts: {
                isRequired: (state) => (!state.branches),
                merge: res => ({branches: res.data}),
                uri: ({ repo, owner }) => `${host}/api/v1/repos/${owner}/${repo}/branches`,
              },
              store,
            }
          )(RepositoryContentBranches)} />
      <Route path="issues"
        component={RepositoryContentIssues} />
      <Route path="pulls"
        component={RepositoryContentIssues} />
      <Route path="projects"
        component={RepositoryContentProjects} />
      <Route path="wiki"
        component={RepositoryContentWiki} />
      <Route path="pulse"
        component={RepositoryContentPulse} />
      <Route path="graphs"
        component={RepositoryContentGraphs} />
      <Route path="settings"
        component={RepositoryContentSettings} />
    </Route>
  </Route>
)
