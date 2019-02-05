// @flow

import * as React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'time-elements'

import createConfigureStore from './store'
import { AppContainer } from './components/App'
import GlobalStyles from './GlobalStyles'
import Login from './components/Login'
import { HomeContainer } from './components/Home'
import New from './components/New'
import { RepositoryContainer } from './components/Repository'
import { RepositoryHomeContainer } from './components/Repository/RepositoryHome'
import RepoTree from './components/Repository/Tree'
import { RepositoryFileContentContainer } from './components/Repository/RepositoryFileContent'
import { RepositoryCommitContainer } from './components/Repository/RepositoryCommit'
import { RepositoryCommitsContainer } from './components/Repository/RepositoryCommits'
import { RepositoryBranchesContainer } from './components/Repository/RepositoryBranches'
import RepositoryIssues from './components/Repository/RepositoryIssues'
import RepositoryProjects from './components/Repository/RepositoryProjects'
import RepoWiki from './components/Repository/Wiki'
import RepositoryPulse from './components/Repository/RepositoryPulse'
import RepositoryGraphs from './components/Repository/RepositoryGraphs'
import RepoSettings from './components/Repository/Settings'
import User from './components/User'

const store = createConfigureStore({})

// prettier-ignore
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppContainer>
        <GlobalStyles />
        <Switch>
          <Route exact path="/" component={HomeContainer} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/new" component={New} />
          <Route exact path="/:owner" component={User} />
          <Route
            path="/:owner/:repo"
            component={() => (
              <RepositoryContainer>
                <Switch>
                  <Route exact path="/:owner/:repo" component={RepositoryHomeContainer} />
                  <Route exact path="/:owner/:repo/blob/:branch/:path*" component={RepositoryFileContentContainer} />
                  <Route exact path="/:owner/:repo/branches" component={RepositoryBranchesContainer} />
                  <Route exact path="/:owner/:repo/commit/:sha" component={RepositoryCommitContainer} />
                  <Route exact path="/:owner/:repo/commits" component={RepositoryCommitsContainer} />
                  <Route exact path="/:owner/:repo/graphs" component={RepositoryGraphs} />
                  <Route exact path="/:owner/:repo/issues" component={RepositoryIssues} />
                  <Route exact path="/:owner/:repo/projects" component={RepositoryProjects} />
                  <Route exact path="/:owner/:repo/pulls" component={RepositoryIssues} />
                  <Route exact path="/:owner/:repo/pulse" component={RepositoryPulse} />
                  <Route exact path="/:owner/:repo/settings" component={RepoSettings} />
                  <Route exact path="/:owner/:repo/tree/:tree" component={RepositoryHomeContainer} />
                  <Route exact path="/:owner/:repo/tree/:tree/:path*" component={RepoTree} />
                  <Route exact path="/:owner/:repo/wiki" component={RepoWiki} />
                </Switch>
              </RepositoryContainer>
            )}
          />
        </Switch>
      </AppContainer>
    </BrowserRouter>
  </Provider>,
  global.document.getElementById('app')
)
