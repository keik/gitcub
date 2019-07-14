// @flow

import UserMock from '@gitcub/mocks/UserMock'
import { storiesOf } from '@storybook/react'
import { base, filename } from 'paths.macro'
import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { storyname } from 'storybook-utils'

import User from './User'

storiesOf(storyname(base, filename), module).add('with default', () => (
  <MemoryRouter>
    <User user={UserMock}>%CHILDREN%</User>
  </MemoryRouter>
))
