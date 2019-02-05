// @flow

import { storiesOf } from '@storybook/react'
import { base, filename } from 'paths.macro'
import * as React from 'react'
import { storyname } from 'storybook-utils'

import Home from './Home'

storiesOf(storyname(base, filename), module).add('default', () => (
  <Home
    repositories={[
      { full_name: 'FULL_NAME1' },
      { full_name: 'FULL_NAME2' },
      { full_name: 'FULL_NAME3' }
    ]}
  />
))
