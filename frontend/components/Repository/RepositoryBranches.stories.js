// @flow

import { storiesOf } from '@storybook/react'
import { base, filename } from 'paths.macro'
import * as React from 'react'
import { storyname } from 'storybook-utils'

import RepositoryBranches from './RepositoryBranches'

storiesOf(storyname(base, filename), module).add('with default', () => (
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
