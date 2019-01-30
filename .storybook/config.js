// @flow

import * as React from 'react'
import { addDecorator, configure } from '@storybook/react'
import GlobalStyles from '../frontend/GlobalStyles'

// automatically import all files ending in *.stories.js
// $FlowFixMe
const req = require.context('../frontend', true, /.stories.js$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

addDecorator(storyFn => (
  <>
    <GlobalStyles />
    {storyFn()}
  </>
))

configure(loadStories, module)
