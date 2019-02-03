// @flow

import * as React from 'react'
import { storiesOf } from '@storybook/react'

import { Branches } from './Branches'

storiesOf('Repository/Branches', module).add('with default', () => (
  <Branches
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
