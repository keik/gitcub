// @flow

import { storiesOf } from '@storybook/react'
import * as React from 'react'

import RepositoryPulse from './RepositoryPulse'

storiesOf('Repository/RepositoryPulse', module).add('with default', () => (
  <RepositoryPulse />
))
