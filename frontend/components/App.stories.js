// @flow

import { storiesOf } from '@storybook/react'
import { base, filename } from 'paths.macro'
import * as React from 'react'
import { storyname } from 'storybook-utils'

import { App } from './App'

storiesOf(storyname(base, filename), module)
  .add('without session', () => <App session={null}>%CHILDREN%</App>)
  .add('with session', () => (
    <App
      session={{
        bio: '%BIO%',
        email: '%EMAIL%',
        login: '%LOGIN%',
        name: '%STRING%',
        password: '%PASSWORD%'
      }}
    >
      %CHILDREN%
    </App>
  ))
