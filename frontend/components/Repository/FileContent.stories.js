// @flow

import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { storiesOf } from '@storybook/react'

import { FileContent } from './FileContent'

storiesOf('Repository/FileContent', module).add('with default', () => (
  <MemoryRouter>
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
      match={{
        params: {
          branch: '$BRANCH',
          owner: '$OWNER',
          repo: '$REPO',
          path: '$PATH'
        }
      }}
    />
  </MemoryRouter>
))
