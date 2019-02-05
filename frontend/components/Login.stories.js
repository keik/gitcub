// @flow

import { storiesOf } from '@storybook/react'
import { base, filename } from 'paths.macro'
import * as React from 'react'
import { storyname } from 'storybook-utils'

import Login from './Login'

storiesOf(storyname(base, filename), module).add('without session', () => (
  <Login />
))
