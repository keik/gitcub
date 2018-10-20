// @flow

import * as React from 'react'
import renderer from 'react-test-renderer'

import { FileContent } from './FileContent'

test('<FileContent /> snapshot', () => {
  const tree = renderer
    .create(
      <FileContent
        contributors={['$CONTRIBUTOR_1', '$CONTRIBUTOR_2']}
        entry={{
          content: '$CONTENT',
          name: '$NAME',
          path: '$PATH',
          sha: '$SHA',
          size: 10,
          type: '$TYPE',
          url: '$URL'
        }}
        params={{
          branch: '$BRANCH',
          owner: '$OWNER',
          repo: '$REPO',
          splat: '$SPLAT'
        }}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
