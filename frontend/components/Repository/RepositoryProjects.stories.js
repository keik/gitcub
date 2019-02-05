// @flow

import { storiesOf } from '@storybook/react'
import * as React from 'react'

import RepositoryProjects from './RepositoryProjects'

storiesOf('Repository/RepositoryProjects', module).add('with default', () => (
  <RepositoryProjects />
))
