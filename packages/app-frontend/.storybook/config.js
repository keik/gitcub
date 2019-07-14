// @flow

import { addDecorator, configure } from '@storybook/react'
import * as React from 'react'
import { ThemeProvider } from 'styled-components'

import GlobalStyles from '../components/GlobalStyles'
import theme from '../theme'

// automatically import all files ending in *.stories.js
// $FlowFixMe
const req = require.context('../components', true, /.stories.js$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

addDecorator(storyFn => (
  <>
    <GlobalStyles />
    <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>
  </>
))

configure(loadStories, module)
