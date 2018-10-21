// @flow

import * as React from 'react'
import renderer from 'react-test-renderer'

import { Branches } from './Branches'

test('<Branches /> snapshot', () => {
  const tree = renderer
    .create(
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
        params={{ owner: '$OWNER', repo: '$REPO' }}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
