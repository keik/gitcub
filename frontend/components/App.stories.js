// @flow

import { storiesOf } from '@storybook/react'
import { base, filename } from 'paths.macro'
import * as React from 'react'
import { storyname } from 'storybook-utils'

const App =
  process.env.NODE_ENV === 'development'
    ? require('inject-loader!./App')({
        './User': { UserContainer: () => 'MOCKED' }
      }).default
    : require('./App').default

storiesOf(storyname(base, filename), module).add('default', () => <App />)
