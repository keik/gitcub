// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'

import { Issues } from './Issues'

storiesOf('Repository/Issues', module).add('with default', () => (
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
    params={{
      owner: '$OWNER',
      repo: '$REPO'
    }}
  />
))
