// @flow

import * as React from 'react'
import { storiesOf } from '@storybook/react'

import RepositoryMilestones from './RepositoryMilestones'

storiesOf('Repository/RepositoryMilestones', module).add('with default', () => (
  <RepositoryMilestones />
))
