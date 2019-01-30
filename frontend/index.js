// @flow

import * as React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'time-elements'

import createConfigureStore from './stores'
import App from './components/App'
import GlobalStyles from './GlobalStyles'
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

const store = createConfigureStore({})

// prettier-ignore
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <GlobalStyles />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/new" component={New} />
          <Route exact path="/:owner" component={User} />
          <Route
            path="/:owner/:repo"
            component={() => (
              <Repository>
                <Switch>
                  <Route exact path="/:owner/:repo" component={RepoHome} />
                  <Route exact path="/:owner/:repo/blob/:branch/:path*" component={RepoFileContent} />
                  <Route exact path="/:owner/:repo/branches" component={RepoBranches} />
                  <Route exact path="/:owner/:repo/commit/:sha" component={RepoCommit} />
                  <Route exact path="/:owner/:repo/commits" component={RepoCommits} />
                  <Route exact path="/:owner/:repo/graphs" component={RepoGraphs} />
                  <Route exact path="/:owner/:repo/issues" component={RepoIssues} />
                  <Route exact path="/:owner/:repo/projects" component={RepoProjects} />
                  <Route exact path="/:owner/:repo/pulls" component={RepoIssues} />
                  <Route exact path="/:owner/:repo/pulse" component={RepoPulse} />
                  <Route exact path="/:owner/:repo/settings" component={RepoSettings} />
                  <Route exact path="/:owner/:repo/tree/:tree" component={RepoHome} />
                  <Route exact path="/:owner/:repo/tree/:tree/:path*" component={RepoTree} />
                  <Route exact path="/:owner/:repo/wiki" component={RepoWiki} />
                </Switch>
              </Repository>
            )}
          />
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>,
  global.document.getElementById('app')
)
