// @flow

import * as React from 'react'
import { storiesOf } from '@storybook/react'

import RepositoryWiki from './RepositoryWiki'

storiesOf('Repository/RepositoryWiki', module).add('with default', () => (
  <RepositoryWiki />
))
