// @flow

import * as React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import 'time-elements'

import createConfigureStore from './store'
import { AppContainer } from './components/App'
import GlobalStyles from './GlobalStyles'
import Login from './components/Login'
import { HomeContainer } from './components/Home'
import New from './components/New'
import { RepositoryContainer } from './components/Repository'
import { RepositoryHomeContainer } from './components/Repository/RepositoryHome'
import { RepositoryTreeContainer } from './components/Repository/RepositoryTree'
import { RepositoryFileContentContainer } from './components/Repository/RepositoryFileContent'
import { RepositoryCommitContainer } from './components/Repository/RepositoryCommit'
import { RepositoryCommitsContainer } from './components/Repository/RepositoryCommits'
import { RepositoryBranchesContainer } from './components/Repository/RepositoryBranches'
import RepositoryIssues from './components/Repository/RepositoryIssues'
import RepositoryProjects from './components/Repository/RepositoryProjects'
import RepositoryWiki from './components/Repository/RepositoryWiki'
import RepositoryPulse from './components/Repository/RepositoryPulse'
import RepositoryGraphs from './components/Repository/RepositoryGraphs'
import RepositorySettings from './components/Repository/RepositorySettings'
import { UserContainer } from './components/User'
import theme from './theme'

const store = createConfigureStore({})

// prettier-ignore
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AppContainer>
          <GlobalStyles />
          <Switch>
            <Route exact path="/" component={HomeContainer} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/new" component={New} />
            <Route exact path="/:username" component={UserContainer} />
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
                    <Route exact path="/:owner/:repo/settings" component={RepositorySettings} />
                    <Route exact path="/:owner/:repo/tree/:tree" component={RepositoryHomeContainer} />
                    <Route exact path="/:owner/:repo/tree/:tree/:path*" component={RepositoryTreeContainer} />
                    <Route exact path="/:owner/:repo/wiki" component={RepositoryWiki} />
                  </Switch>
                </RepositoryContainer>
              )}
            />
          </Switch>
        </AppContainer>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
  global.document.getElementById('app')
)
