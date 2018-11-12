// @flow

import '@babel/polyfill'
import { injectGlobal } from 'emotion'
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

injectGlobal`
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  color: #333;
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  line-height: 1.5;
}

a {
  text-decoration: none;
  color: #4078c0;
}

a:hover,
a:active {
  text-decoration: underline;
  outline-width: 0;
}

code {
  font-family: Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  font-size: 12px;
  color: #333;
  word-wrap: normal;
  white-space: pre;
}

hr {
  margin: 16px 0;
  border: 0;
  border-bottom: 1px solid #ddd;
}

input[type='text'] {
  min-height: 34px;
  padding: 6px 8px;
  font-size: 14px;
  line-height: 20px;
  color: #333;
  vertical-align: middle;
  background-color: #fff;
  background-repeat: no-repeat;
  background-position: right 8px center;
  border: 1px solid #ddd;
  border-radius: 3px;
  outline: none;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.075);
}
`

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
