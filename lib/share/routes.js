// @flow

import React from 'react'
import { Route, IndexRoute } from 'react-router'

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

const routes = (
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
      <Route path="issues" component={RepoIssues} />
      <Route path="pulls" component={RepoIssues} />
      <Route path="projects" component={RepoProjects} />
      <Route path="tree/:tree" component={RepoHome} />
      <Route path="tree/:tree/*" component={RepoTree} />
      <Route path="wiki" component={RepoWiki} />
      <Route path="pulse" component={RepoPulse} />
      <Route path="graphs" component={RepoGraphs} />
      <Route path="settings" component={RepoSettings} />
    </Route>
  </Route>
)

export default routes
