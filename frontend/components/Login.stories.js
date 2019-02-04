// @flow

import * as React from 'react'
import { storiesOf } from '@storybook/react'

import Login from './Login'

storiesOf('Login', module).add('without session', () => <Login />)
