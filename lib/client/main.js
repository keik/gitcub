// @flow

import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import 'time-elements'

import createConfigureStore from '../share/stores'
import routes from '../share/routes'

const store = createConfigureStore(global.APP_PROPS)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>{routes(store)}</Router>
  </Provider>,
  global.document.getElementById('app')
)
