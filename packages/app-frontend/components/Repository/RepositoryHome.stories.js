// @flow

import { storiesOf } from '@storybook/react'
import { base, filename } from 'paths.macro'
import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { storyname } from 'storybook-utils'

import RepositoryHome from './RepositoryHome'

storiesOf(storyname(base, filename), module).add('with default', () => (
  <MemoryRouter>
    <RepositoryHome
      branches={[
        {
          commit: {
            author: {
              date: '#DATE_1',
              name: '#NAME_1'
            },
            sha: '#SHA_1',
            message: '#MESSAGE_1'
          },
          name: '#BRANCH_1'
        },
        {
          commit: {
            author: {
              date: '#DATE_2',
              name: '#NAME_2'
            },
            sha: '#SHA_2',
            message: '#MESSAGE_2'
          },
          name: '#BRANCH_2'
        }
      ]}
      commits={[]}
      contributorsCount={-1}
      entries={[
        {
          lastCommit: {
            author: {
              date: '#DATE_1',
              name: '#NAME_1'
            },
            sha: '#SHA_1',
            message: '#MESSAGE_1'
          },
          path: '#PATH/#PATH_1',
          sha: '#SHA_1',
          size: 10,
          type: 'blob',
          url: '#URL_1'
        },
        {
          lastCommit: {
            author: {
              date: '#DATE_1',
              name: '#NAME_1'
            },
            sha: '#SHA_1',
            message: '#MESSAGE_1'
          },
          path: '#PATH_2',
          sha: '#SHA_2',
          size: 10,
          type: 'blob',
          url: '#URL_2'
        }
      ]}
      match={{
        params: {
          owner: '#OWNER',
          repo: '#REPO',
          tree: '#TREE',
          path: '#PATH'
        }
      }}
      tags={[]}
    />
  </MemoryRouter>
))
