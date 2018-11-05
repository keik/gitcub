// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'

import { Repository, Navigations } from './Repository'

storiesOf('Repository1', module)
  .add('with default', () => (
    <Repository
      forkedCount={1}
      issuesCount={2}
      location={{ pathmame: '$PATHNAME' }}
      match={{ params: { owner: '$OWNER', repo: '$REPO', tree: '$TREE' } }}
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
  .add('part of Navigations', () => (
    <Navigations
      issuesCount={1}
      location={{ pathmame: '$PATHNAME' }}
      params={{
        owner: '$OWNER',
        repo: '$REPO'
      }}
      pullRequestsCount={2}
      projectsCount={3}
      routes={[{ path: 'pulls' }]}
    />
  ))
