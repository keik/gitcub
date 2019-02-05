// @flow

import { storiesOf } from '@storybook/react'
import { base, filename } from 'paths.macro'
import * as React from 'react'
import { storyname } from 'storybook-utils'

import RepositoryPulse from './RepositoryPulse'

storiesOf(storyname(base, filename), module).add('with default', () => (
  <RepositoryPulse />
))
