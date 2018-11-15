// @flow

import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { storiesOf } from '@storybook/react'

import { Repository, Navigations } from './Repository'

storiesOf('Repository1', module)
  .add('with default', () => (
    <MemoryRouter>
      <Repository
        match={{
          params: {
            owner: '$OWNER',
            repo: '$REPO',
            tree: '$TREE'
          }
        }}
        routes={[{}]}
        session={{}}
      >
        children
      </Repository>
    </MemoryRouter>
  ))
  .add('part of Navigations', () => (
    <MemoryRouter>
      <Navigations
        issuesCount={1}
        match={{
          params: {
            owner: '$OWNER',
            repo: '$REPO'
          }
        }}
        pullRequestsCount={2}
        projectsCount={3}
        routes={[{ path: 'pulls' }]}
      />
    </MemoryRouter>
  ))
