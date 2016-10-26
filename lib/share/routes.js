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

const fetchInitialProps = (store) => (nextState, replace, cb) => {
  d('fetchInitialProps', store)
  if (typeof window === 'undefined') {
    d('pass initial fetch in Node env')
    return cb()
  }

  d('fetching initial props...')
  Promise
    .all(nextState.routes.map(({component: c}) => c.fetchData ?
      c.fetchData({ store, params: nextState.params }) :
      Promise.resolve(false)
    ))
    .then(() => (cb()))
    .catch((err) => {
      console.error(err)
    })
}

export default (store) => (
  <Route path="/" component={connect(state => state)(App)}>
    <IndexRoute component={Home} />
    <Route path="/:owner"
      component={connect(state => state)(User)} />
    <Route path="/:owner/:id" component={connect(state => ({repository: state.repository, fetched: state.fetched}))(Repository)}>
      <IndexRoute
        component={connect((state, props) => {
            console.log('@@@@@@@@@@@@@@@@@@@@@')
            console.log(state)
            console.log('@@@@@@@@@@@@@@@@@@@@@2')
            console.log(props.route.component.propTypes)
            console.log(props.route.component.WrappedComponent.propTypes)
            return ({repository: state.repository, fetched: state.fetched})
          })(RepositoryContentEntries)}
        onEnter={fetchInitialProps(store)} />
      <Route path="tree/:branch/*"
        component={connect((state,a,b,c) => {
            console.log('@@@@@@@@@@@@@@@@@@@@@')
            console.log(state, a,b,c)
            return ({repository: state.repository, fetched: state.fetched})
          })(RepositoryContentEntries)}
        onEnter={fetchInitialProps(store)} />
      <Route path="blob/:branch/*"
        component={connect((state, props) => state.repository.entries.find(e => e.path === props.params.splat))(RepositoryContentFileContent)}
        onEnter={fetchInitialProps(store)} />
      <Route path="commits"
        component={RepositoryContentCommits}
        onEnter={fetchInitialProps(store)} />
      <Route path="branches"
        component={RepositoryContentBranches}
        onEnter={fetchInitialProps(store)} />
      <Route path="issues"
        component={RepositoryContentIssues}
        onEnter={fetchInitialProps(store)} />
      <Route path="pulls"
        component={RepositoryContentIssues}
        onEnter={fetchInitialProps(store)} />
      <Route path="projects"
        component={RepositoryContentProjects}
        onEnter={fetchInitialProps(store)} />
      <Route path="wiki"
        component={RepositoryContentWiki}
        onEnter={fetchInitialProps(store)} />
      <Route path="pulse"
        component={RepositoryContentPulse}
        onEnter={fetchInitialProps(store)} />
      <Route path="graphs"
        component={RepositoryContentGraphs}
        onEnter={fetchInitialProps(store)} />
      <Route path="settings"
        component={RepositoryContentSettings}
        onEnter={fetchInitialProps(store)} />
    </Route>
  </Route>
)
