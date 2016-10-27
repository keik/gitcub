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
function fetch(type, params) {
  d(`fetch (type: ${type})`)
  const { id, owner, branch } = params
  switch(type) {
    case 'branches':
      return axios.get(`${host}/api/v1/repos/${owner}/${id}/branches`).then(res => res.data)
    case 'commits':
      return axios.get(`${host}/api/v1/repos/${owner}/${id}/commits`).then(res => res.data)
    case 'tags':
      return axios.get(`${host}/api/v1/repos/${owner}/${id}/tags`).then(res => res.data)
    case 'entries':
      return axios.get(`${host}/api/v1/repos/${owner}/${id}/git/trees/${branch ? branch : ''}?last_commit=1`).then(res => res.data.tree)
    case 'params':
      return Promise.resolve(params)
    default:
      return Promise.reject(false)
  }
}

const connectWithInitialFetch = (Component, mapStateToProps, store) => (nextState, cb) => {
  d('connectWithInitialFetch', store)
  /* if (typeof window === 'undefined') {
   *   d('pass initial fetch in Node env')
   *   return cb()
   * }*/
  const params = nextState.params
  const state = mapStateToProps(store.getState(), nextState)
  const requiredProps = Object.keys(Component.propTypes)
  const unfetchedProps = requiredProps.filter(p => !state[p])
  if (unfetchedProps.length === 0) {
    d('no need to fetch props')
    cb(null, connect(mapStateToProps)(Component))
    return
  }

  d('fetching initial props...')
  store.dispatch(RepositoryActions.fetching())
  Promise
    .all(
      requiredProps.map(p => state[p] ?
                           Promise.resolve() :
                           fetch(p, params)))
    .then(result => {
      const data = requiredProps.reduce((acc, p, i) => { acc[p] = result[i]; return acc }, {})
      console.log(data)
      store.dispatch(RepositoryActions.fetchSuccess(data))
      cb(null, connect(mapStateToProps)(Component))
    })
    .catch(err => {
      console.log(err)
      store.dispatch(RepositoryActions.fetchFailure(err))
      cb(null, connect(mapStateToProps)(Component))
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
            RepositoryContentEntries,
            (state) => (state.repository),
            store,
            ({ params: { owner, id } }) => ({
              branches: `${host}/api/v1/repos/${owner}/${id}/branches`,
              commits: `${host}/api/v1/repos/${owner}/${id}/commits`,
              entries: `${host}/api/v1/repos/${owner}/${id}/git/trees/${branch ? branch : ''}?last_commit=1`,
              tags: `${host}/api/v1/repos/${owner}/${id}/tags`,
            })
          )} />
      <Route path="commits"
        getComponent={connectWithInitialFetch(RepositoryContentCommits, (state) => (state.repository), store)} />
      <Route path="blob/:branch/*"
        getComponent={connectWithInitialFetch(
            RepositoryContentFileContent,
            (state, props) => {
              debugger
              return {...state.repository}
            },
            store,
          )} />
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
