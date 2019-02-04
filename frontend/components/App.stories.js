// @flow

import * as React from 'react'
import { storiesOf } from '@storybook/react'

import App from './App'

storiesOf('App', module)
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
