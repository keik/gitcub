// @flow

import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/App'
import Login from './components/Login'
import Home from './components/Home'
import New from './components/New'
import Repository from './components/Repository'
import RepoHome from './components/Repository/Home'
import RepoTree from './components/Repository/Tree'
import RepoFileContent from './components/Repository/FileContent'
import RepoCommit from './components/Repository/Commit'
import RepoCommits from './components/Repository/Commits'
import RepoBranches from './components/Repository/Branches'
import RepoIssues from './components/Repository/Issues'
import RepoProjects from './components/Repository/Projects'
import RepoWiki from './components/Repository/Wiki'
import RepoPulse from './components/Repository/Pulse'
import RepoGraphs from './components/Repository/Graphs'
import RepoSettings from './components/Repository/Settings'
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
