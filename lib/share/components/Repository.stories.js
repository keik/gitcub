// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'

import { Repository } from './Repository'

storiesOf('Repository1', module).add('with default', () => (
  <Repository
    forkedCount={1}
    issuesCount={2}
    params={{ owner: '$OWNER', repo: '$REPO' }}
    projectsCount={3}
    pullRequestsCount={5}
    routes={[{}]}
    session={{}}
    staredCount={4}
    watchedCount={6}
  >
    children
  </Repository>
))
