// @flow

import * as React from 'react'
import { storiesOf } from '@storybook/react'

import { Milestones } from './Milestones'

storiesOf('Repository/Milestones', module).add('with default', () => (
  <Milestones />
))
