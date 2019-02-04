// @flow

import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'

import RepositoryCommits from './RepositoryCommits'

storiesOf('Repository/RepositoryCommits', module).add('with default', () => (
  <MemoryRouter>
    <RepositoryCommits
      commits={[
        {
          commit: {
            author: {
              date: '$DATE_1',
              name: '$NAME_1'
            },
            sha: '$SHA_1',
            message: '$MESSAGE_1'
          },
          html_url: '$HTML_URL_1',
          parents: [{ sha: '$PARENT_SHA_1' }],
          sha: '$SHA_1',
          url: '$URL_1'
        },
        {
          commit: {
            author: {
              date: '$DATE_2',
              name: '$NAME_2'
            },
            sha: '$SHA_2',
            message: '$MESSAGE_2'
          },
          html_url: '$HTML_URL_2',
          parents: [{ sha: '$PARENT_SHA_2' }],
          sha: '$SHA_2',
          url: '$URL_2'
        }
      ]}
      match={{ params: { owner: '$OWNER', repo: '$REPO', sha: '$SHA' } }}
    />
  </MemoryRouter>
))
