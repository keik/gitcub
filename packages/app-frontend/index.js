// @flow

import * as React from 'react'
import ReactDOM from 'react-dom'
import 'time-elements'
import { ThemeProvider } from 'styled-components'

import App from './components/App'
import GlobalStyles from './components/GlobalStyles'
import theme from './theme'

ReactDOM.render(
  <>
    <GlobalStyles />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </>,
  global.document.getElementById('app')
)
