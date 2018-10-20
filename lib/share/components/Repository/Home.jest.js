// @flow

import * as React from 'react'
import renderer from 'react-test-renderer'

import { Home } from './Home'

test('<Home /> snapshot', () => {
  const tree = renderer
    .create(
      <Home
        branches={[]}
        commits={[]}
        contributorsCount={10}
        entries={[
          {
            content: '$CONTENT_1',
            lastCommit: {
              author: {
                date: '$DATE_1',
                name: '$NAME_1'
              },
              sha: '$SHA_1',
              message: '$MESSAGE_1'
            },
            name: '$NAME_1',
            path: '$PATH_1',
            sha: '$SHA_1',
            size: 10,
            type: 'blob',
            url: '$URL_1'
          },
          {
            content: '$CONTENT_2',
            lastCommit: {
              author: {
                date: '$DATE_1',
                name: '$NAME_1'
              },
              sha: '$SHA_1',
              message: '$MESSAGE_1'
            },
            name: '$NAME_2',
            path: '$PATH_2',
            sha: '$SHA_2',
            size: 10,
            type: 'blob',
            url: '$URL_2'
          }
        ]}
        params={{
          owner: '$OWNER',
          repo: '$REPO',
          tree: '$TREE',
          splat: ''
        }}
        tags={[]}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
