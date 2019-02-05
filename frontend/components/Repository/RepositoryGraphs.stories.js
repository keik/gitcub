// @flow

import * as React from 'react'
import { storiesOf } from '@storybook/react'

import RepositoryGraphs from './RepositoryGraphs'

storiesOf('Repository/Graphs', module).add('with default', () => (
  <RepositoryGraphs />
))
