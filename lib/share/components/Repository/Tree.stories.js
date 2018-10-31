// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'

import { Tree, Breadcrumbs } from './Tree'

storiesOf('Repository/Tree', module).add('with default', () => (
  <Tree
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
      splat: '#SPLAT'
    }}
    tags={[]}
  />
))

storiesOf('Repository/Tree__Breadcrumbs', module)
  .add('with default', () => (
    <Breadcrumbs
      params={{ owner: 'foo', repo: 'bar', tree: 'TREE', splat: 'SPLAT' }}
    />
  ))
  .add('with 3rd level path', () => (
    <Breadcrumbs
      params={{ owner: 'foo', repo: 'bar', tree: 'TREE', splat: 'a/b/c' }}
    />
  ))