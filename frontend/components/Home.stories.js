// @flow

import * as React from 'react'
import { storiesOf } from '@storybook/react'

import Home from './Home'

storiesOf('Home', module).add('with default', () => (
  <Home
    repositories={[
      { full_name: 'FULL_NAME1' },
      { full_name: 'FULL_NAME2' },
      { full_name: 'FULL_NAME3' }
    ]}
  />
))
