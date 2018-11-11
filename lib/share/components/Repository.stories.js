// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'

import { Repository, Navigations } from './Repository'

storiesOf('Repository1', module)
  .add('with default', () => (
    <Repository
      location={{
        hash: '$HASH',
        pathname: '$PATHNAME',
        search: '$SEARCH'
      }}
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
  ))
  .add('part of Navigations', () => (
    <Navigations
      issuesCount={1}
      location={{
        hash: '$HASH',
        pathname: '$PATHNAME',
        search: '$SEARCH'
      }}
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
  ))
