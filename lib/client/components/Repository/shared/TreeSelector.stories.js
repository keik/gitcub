// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'

import TreeSelector from './TreeSelector'

storiesOf('Repository/shared/TreeSelector', module).add('with default', () => (
  <TreeSelector
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
    params={{
      owner: '$OWNER',
      repo: '$REPO',
      tree: '$TREE',
      path: '$PATH'
    }}
    tags={[]}
  />
))
