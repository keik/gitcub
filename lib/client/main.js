// @flow

import '@babel/polyfill'
import * as React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
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

// prettier-ignore
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
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

export type RepositoryParamsT = {
  owner: string,
  repo: string,
  tree?: string
}

export type RepositoryFileContentParamsT = RepositoryParamsT & {
  branch: string,
  path: string
}

export type RepositoryCommitParamsT = RepositoryParamsT & {
  sha: string
}

export type RepositoryTreeParamsT = RepositoryParamsT & {
  tree?: string,
  path?: string
}
