// @flow

import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Router, IndexRoute, browserHistory } from 'react-router'
import 'time-elements'

import createConfigureStore from '../share/stores'
import App from '../share/components/App'
import Login from '../share/components/Login'
import Home from '../share/components/Home'
import New from '../share/components/New'
import Repository from '../share/components/Repository'
import RepoHome from '../share/components/Repository/Home'
import RepoTree from '../share/components/Repository/Tree'
import RepoFileContent from '../share/components/Repository/FileContent'
import RepoCommit from '../share/components/Repository/Commit'
import RepoCommits from '../share/components/Repository/Commits'
import RepoBranches from '../share/components/Repository/Branches'
import RepoIssues from '../share/components/Repository/Issues'
import RepoProjects from '../share/components/Repository/Projects'
import RepoWiki from '../share/components/Repository/Wiki'
import RepoPulse from '../share/components/Repository/Pulse'
import RepoGraphs from '../share/components/Repository/Graphs'
import RepoSettings from '../share/components/Repository/Settings'
import User from '../share/components/user'

const store = createConfigureStore({})

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/new" component={New} />
        <Route path="/:owner" component={User} />
        <Route path="/:owner/:repo" component={Repository}>
          <IndexRoute component={RepoHome} />
          <Route path="blob/:branch/*" component={RepoFileContent} />
          <Route path="commit/:sha" component={RepoCommit} />
          <Route path="commits" component={RepoCommits} />
          <Route path="branches" component={RepoBranches} />
          <Route path="issues" component={props => <RepoIssues {...props} />} />
          <Route path="pulls" component={props => <RepoIssues {...props} />} />
          <Route path="projects" component={RepoProjects} />
          <Route path="tree/:tree" component={RepoHome} />
          <Route path="tree/:tree/*" component={RepoTree} />
          <Route path="wiki" component={RepoWiki} />
          <Route path="pulse" component={RepoPulse} />
          <Route path="graphs" component={RepoGraphs} />
          <Route path="settings" component={RepoSettings} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  global.document.getElementById('app')
)
