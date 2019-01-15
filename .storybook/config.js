import * as React from 'react'
import { addDecorator, configure } from '@storybook/react'
import GlobalStyles from '../lib/client/GlobalStyles'

// automatically import all files ending in *.stories.js
const req = require.context('../lib', true, /.stories.js$/)
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
