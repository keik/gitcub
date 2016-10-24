import React from 'react'
import { Route, IndexRoute } from 'react-router'

import AppContainer from './containers/app'
import Home from './components/home'
import RepositoryContainer from './containers/repository'
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

const routes = (
  <Route path="/" component={AppContainer}>
    <IndexRoute component={Home} />
    <Route path="/:owner/:id" component={RepositoryContainer}>
      <IndexRoute component={RepositoryContentEntries} />
      <Route path="/:owner/:id/tree/:branch/*" component={RepositoryContentEntries} />
      <Route path="/:owner/:id/blob/:branch/*" component={RepositoryContentFileContent} />
      <Route path="/:owner/:id/commits" component={RepositoryContentCommits} />
      <Route path="/:owner/:id/branches" component={RepositoryContentBranches} />
      <Route path="/:owner/:id/issues" component={RepositoryContentIssues} />
      <Route path="/:owner/:id/pulls" component={RepositoryContentIssues} />
      <Route path="/:owner/:id/projects" component={RepositoryContentProjects} />
      <Route path="/:owner/:id/wiki" component={RepositoryContentWiki} />
      <Route path="/:owner/:id/pulse" component={RepositoryContentPulse} />
      <Route path="/:owner/:id/graphs" component={RepositoryContentGraphs} />
      <Route path="/:owner/:id/settings" component={RepositoryContentSettings} />
    </Route>
  </Route>
)

export default routes
