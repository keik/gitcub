// @flow

import * as React from 'react'
import { storiesOf } from '@storybook/react'

import RepositorySettings from './RepositorySettings'

storiesOf('Repository/RepositorySettings', module).add('with default', () => (
  <RepositorySettings />
))
