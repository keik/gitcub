// @flow

import * as React from 'react'
// import { hot } from 'react-hot-loader/root'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { applyMiddleware, compose, createStore } from 'redux'
import logger from 'redux-logger'

import rootReducer from '../ducks'
import * as SessionAction from '../ducks/session'
import AppFooter from './App/AppFooter'
import { AppHeaderContainer } from './App/AppHeader'
import { HomeContainer } from './Home'
import Login from './Login'
import New from './New'
import { RepositoryContainer } from './Repository'
import { RepositoryBranchesContainer } from './Repository/RepositoryBranches'
import { RepositoryCommitContainer } from './Repository/RepositoryCommit'
import { RepositoryCommitsContainer } from './Repository/RepositoryCommits'
import { RepositoryFileContentContainer } from './Repository/RepositoryFileContent'
import RepositoryGraphs from './Repository/RepositoryGraphs'
import { RepositoryHomeContainer } from './Repository/RepositoryHome'
import RepositoryIssues from './Repository/RepositoryIssues'
import RepositoryProjects from './Repository/RepositoryProjects'
import RepositoryPulse from './Repository/RepositoryPulse'
import RepositorySettings from './Repository/RepositorySettings'
import { RepositoryTreeContainer } from './Repository/RepositoryTree'
import RepositoryWiki from './Repository/RepositoryWiki'
import { UserContainer } from './User'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      ...[...(process.env.NODE_ENV === 'development' ? [logger] : [])]
    )
  )
)

// prettier-ignore
const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <>
        <AppHeaderContainer />
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
        <AppFooter />
      </>
    </BrowserRouter>
  </Provider>
)

export default App

export const AppContainer = () => {
  const [isLoading, setIsLoading] = React.useState(true)
  React.useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      store.dispatch(await SessionAction.getCurrentUser())
      setIsLoading(false)
    })()
  }, [])

  return isLoading ? <div>Loading...</div> : <App />
}

// TODO: broken develop and test environments. disabled temporary.
// export const AppContainer = hot(() => {
//   const [isLoading, setIsLoading] = React.useState(true)
//   React.useEffect(() => {
//     ;(async () => {
//       setIsLoading(true)
//       store.dispatch(await SessionAction.getCurrentUser())
//       setIsLoading(false)
//     })()
//   }, [])
//
//   return isLoading ? <div>Loading...</div> : <App />
// })
