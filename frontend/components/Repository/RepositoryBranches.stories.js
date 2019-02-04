// @flow

import * as React from 'react'
import { storiesOf } from '@storybook/react'

import RepositoryBranches from './RepositoryBranches'

storiesOf('Repository/RepositoryBranches', module).add('with default', () => (
  <RepositoryBranches
    branches={[
      {
        commit: {
          author: {
            date: '$DATE',
            name: '$AUTHOR'
          },
          message: '$MESSAGE',
          sha: '$SHA'
        },
        name: '$BRANCH'
      }
    ]}
    defaultBranchName="master"
    match={{
      params: {
        owner: '$OWNER',
        repo: '$REPO'
      }
    }}
  />
))
