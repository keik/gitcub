// @flow

import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { storiesOf } from '@storybook/react'

import { Entries } from './Entries'

storiesOf('Repository/shared/Entries', module).add('with default', () => (
  <MemoryRouter>
    <Entries
      entries={[
        {
          content: '#CONTENT_1',
          lastCommit: {
            author: {
              date: '#DATE_1',
              name: '#NAME_1'
            },
            sha: '#SHA_1',
            message: '#MESSAGE_1'
          },
          name: '#NAME_1',
          path: '#SPLAT/#PATH_1',
          sha: '#SHA_1',
          size: 10,
          type: 'blob',
          url: '#URL_1'
        },
        {
          content: '#CONTENT_2',
          lastCommit: {
            author: {
              date: '#DATE_1',
              name: '#NAME_1'
            },
            sha: '#SHA_1',
            message: '#MESSAGE_1'
          },
          name: '#NAME_2',
          path: '#PATH_2',
          sha: '#SHA_2',
          size: 10,
          type: 'blob',
          url: '#URL_2'
        }
      ]}
      params={{
        owner: '#OWNER',
        repo: '#REPO',
        tree: '#TREE',
        path: '#PATH'
      }}
    />
  </MemoryRouter>
))