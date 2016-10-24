import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import 'time-elements'

import createConfigureStore from '../share/stores'
import routes from '../share/routes'

const store = createConfigureStore(browserHistory, global.APP_PROPS)
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  global.document.getElementById('app'))
