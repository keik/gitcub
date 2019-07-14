// @flow

import { storiesOf } from '@storybook/react'
import { base, filename } from 'paths.macro'
import * as React from 'react'
import { storyname } from 'storybook-utils'

import TreeSelector from './TreeSelector'

storiesOf(storyname(base, filename), module).add('with default', () => (
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
