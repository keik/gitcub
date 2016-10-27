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

const connectWithInitialFetch = (mapStateToProps, store, fetch, isRequireFetch) => (Component) => (nextState, cb) => {
  d('connectWithInitialFetch')

  let state
  try { state = mapStateToProps(store.getState(), nextState) }
  catch(e) { state = undefined }

  if (!isRequireFetch(state)) {
    d ('no need to fetch')
    return cb(null, connect(mapStateToProps)(Component))
  }

  d('fetch props...')
  store.dispatch(RepositoryActions.fetching())
  fetch(state, nextState)
    .then((data) => {
      store.dispatch(RepositoryActions.fetchSuccess([...data]))
      cb(null, connect(mapStateToProps)(Component))
    })
    .catch((err) => {
      console.error(err)
      store.dispatch(RepositoryActions.fetchFailure(err))
      cb(err, connect(mapStateToProps)(Component))
    })
}

export default (store) => (
  <Route path="/" component={connect(state => state)(App)}>
    <IndexRoute component={Home} />
    <Route path="/:owner"
      component={connect(state => state)(User)} />
    <Route path="/:owner/:id" component={connect(state => ({repository: state.repository, fetched: state.fetched}))(Repository)}>
      <IndexRoute
        getComponent={connectWithInitialFetch(
            state => state.repository,
            store,
            a,
            (state) => (!state.commits) // cond
          )(RepositoryContentEntries)}
      />
      <Route path="blob/:branch/*"
        getComponent={connectWithInitialFetch(
            ({ repository }, { params: { splat: path } }) => Array.isArray(repository.entries) ? repository.entries.find(e => e.path === path) : undefined,
            store,
            b,
            (state) => (!state || !state.content) // cond
          )(RepositoryContentFileContent)}
      />
      <Route path="commits"
        component={RepositoryContentCommits} />
      <Route path="branches"
        getComponent={connectWithInitialFetch(RepositoryContentBranches, (state) => (state.repository), store)} />
      <Route path="issues"
        getComponent={connectWithInitialFetch(RepositoryContentIssues, (state) => (state.repository), store)} />
      <Route path="pulls"
        getComponent={connectWithInitialFetch(RepositoryContentIssues, (state) => (state.repository), store)} />
      <Route path="projects"
        getComponent={connectWithInitialFetch(RepositoryContentProjects, (state) => (state.repository), store)} />
      <Route path="wiki"
        getComponent={connectWithInitialFetch(RepositoryContentWiki, (state) => (state.repository), store)} />
      <Route path="pulse"
        getComponent={connectWithInitialFetch(RepositoryContentPulse, (state) => (state.repository), store)} />
      <Route path="graphs"
        getComponent={connectWithInitialFetch(RepositoryContentGraphs, (state) => (state.repository), store)} />
      <Route path="settings"
        getComponent={connectWithInitialFetch(RepositoryContentSettings, (state) => (state.repository), store)} />
    </Route>
  </Route>
)

function a(state, nextState) {
  const { owner, id, branch } = nextState.params
  return Promise
    .all([
      axios.get(`${host}/api/v1/repos/${owner}/${id}/branches`).then(res => ({branches: res.data})),
      axios.get(`${host}/api/v1/repos/${owner}/${id}/commits`).then(res => ({commits: res.data})),
      axios.get(`${host}/api/v1/repos/${owner}/${id}/git/trees/${branch ? branch : ''}?last_commit=1`).then(res => ({entries: res.data.tree})),
      axios.get(`${host}/api/v1/repos/${owner}/${id}/tags`).then(res => ({tags: res.data})),
    ])
}

function b(state, nextState) {
  const { branch, id, owner, splat: path } = nextState.params
  return Promise
    .all([
      axios.get(`${host}/api/v1/repos/${owner}/${id}/git/blobs/${branch}/${path}`).then(res => (res.data.path = path, {entries: [res.data]}))
    ])
}
