import debug from 'debug'
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { connect } from 'react-redux'

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

const fetchInitialProps = (dispatch) => (nextState, replace, cb) => {
  d('fetchInitialProps')
  if (typeof window === 'undefined') {
    d('pass initial fetch in Node env')
    return cb()
  }

  d('fetching initial props...')
  Promise
    .all(nextState.routes.map(({component: c}) => c.fetchData ?
      c.fetchData({ dispatch, params: nextState.params }) :
      Promise.resolve(false)
    ))
    .then(() => (cb()))
    .catch((err) => {
      console.error(err)
    })
}

export default (dispatch) => (
  <Route path="/" component={connect(state => state)(App)}>
    <IndexRoute component={Home} />
    <Route path="/:owner"
      component={connect(state => state)(User)} />
    <Route path="/:owner/:id" component={connect(state => state.repository)(Repository)}>
      <IndexRoute
        component={connect(state => state.repository)(RepositoryContentEntries)}
        onEnter={fetchInitialProps(dispatch)} />
      <Route path="tree/:branch/*"
        component={connect(state => state.repository)(RepositoryContentEntries)}
        onEnter={fetchInitialProps(dispatch)} />
      <Route path="blob/:branch/*"
        component={connect((state, props) => state.repository.entries.find(e => e.path === props.params.splat))(RepositoryContentFileContent)}
        onEnter={fetchInitialProps(dispatch)} />
      <Route path="commits"
        component={RepositoryContentCommits}
        onEnter={fetchInitialProps(dispatch)} />
      <Route path="branches"
        component={RepositoryContentBranches}
        onEnter={fetchInitialProps(dispatch)} />
      <Route path="issues"
        component={RepositoryContentIssues}
        onEnter={fetchInitialProps(dispatch)} />
      <Route path="pulls"
        component={RepositoryContentIssues}
        onEnter={fetchInitialProps(dispatch)} />
      <Route path="projects"
        component={RepositoryContentProjects}
        onEnter={fetchInitialProps(dispatch)} />
      <Route path="wiki"
        component={RepositoryContentWiki}
        onEnter={fetchInitialProps(dispatch)} />
      <Route path="pulse"
        component={RepositoryContentPulse}
        onEnter={fetchInitialProps(dispatch)} />
      <Route path="graphs"
        component={RepositoryContentGraphs}
        onEnter={fetchInitialProps(dispatch)} />
      <Route path="settings"
        component={RepositoryContentSettings}
        onEnter={fetchInitialProps(dispatch)} />
    </Route>
  </Route>
)
