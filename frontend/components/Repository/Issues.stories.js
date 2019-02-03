// @flow

import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { storiesOf } from '@storybook/react'

import { Issues } from './Issues'

storiesOf('Repository/Issues', module).add('with default', () => (
  <MemoryRouter>
    <Issues
      issues={[
        {
          id: 1,
          title: '$TITLE_1',
          createdAt: '$CREATED_AT_1',
          createdBy: '$CREATED_BY_1',
          commentsCount: 1
        },
        {
          id: 2,
          title: '$TITLE_2',
          createdAt: '$CREATED_AT_2',
          createdBy: '$CREATED_BY_2',
          commentsCount: 2
        }
      ]}
      match={{
        params: {
          owner: '$OWNER',
          repo: '$REPO'
        }
      }}
    />
  </MemoryRouter>
))
