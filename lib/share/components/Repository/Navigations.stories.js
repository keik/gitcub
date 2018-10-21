// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'

import { Navigations } from './Navigations'

storiesOf('Repository/Navigations', module).add('with default', () => (
  <Navigations
    issuesCount={1}
    params={{
      owner: '$OWNER',
      repo: '$REPO'
    }}
    pullRequestsCount={2}
    projectsCount={3}
    routes={[{ path: 'pulls' }]}
  />
))
