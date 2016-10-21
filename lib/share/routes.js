import React from 'react'
import { Route, IndexRoute } from 'react-router'

// import RepositoryApp from './components/repository'
import AppContainer from './containers/app'
import Home from './components/home'
import RepositoryContainer from './containers/repository'
import RepositoryContentEntries from './components/repository/contents/entries'
import RepositoryContentFileContent from './components/repository/contents/file-content'
import RepositoryContentCommits from './components/repository/contents/commits'
import RepositoryContentBranches from './components/repository/contents/branches'
import RepositoryContentIssues from './components/repository/contents/issues'
import RepositoryContentPullRequests from './components/repository/contents/pull-requests'
import RepositoryContentProjects from './components/repository/contents/projects'
import RepositoryContentWiki from './components/repository/contents/wiki'
import RepositoryContentPulse from './components/repository/contents/pulse'
import RepositoryContentGraphs from './components/repository/contents/graphs'
import RepositoryContentSettings from './components/repository/contents/settings'


// <Route path="/:user/:repo" component={RepositoryApp}>
const routes = (
  <Route path="/" component={AppContainer}>
    <IndexRoute component={Home} />
    <Route path="/:user/:repo" component={RepositoryContainer}>
      <IndexRoute component={RepositoryContentEntries} />
      <Route path="/:user/:repo/blob/:branch/:path" component={RepositoryContentFileContent} />
      <Route path="/:user/:repo/commits" component={RepositoryContentCommits} />
      <Route path="/:user/:repo/branches" component={RepositoryContentBranches} />
      <Route path="/:user/:repo/issues" component={RepositoryContentIssues} />
      <Route path="/:user/:repo/pulls" component={RepositoryContentPullRequests} />
      <Route path="/:user/:repo/projects" component={RepositoryContentProjects} />
      <Route path="/:user/:repo/wiki" component={RepositoryContentWiki} />
      <Route path="/:user/:repo/pulse" component={RepositoryContentPulse} />
      <Route path="/:user/:repo/graphs" component={RepositoryContentGraphs} />
      <Route path="/:user/:repo/settings" component={RepositoryContentSettings} />
    </Route>
  </Route>
)

export default routes
