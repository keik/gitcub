// @flow

import * as React from 'react'
import ReactDOM from 'react-dom'
import 'time-elements'

import App from './components/App'
import GlobalStyles from './components/GlobalStyles'

ReactDOM.render(
  <>
    <GlobalStyles />
    <App />
  </>,
  global.document.getElementById('app')
)
