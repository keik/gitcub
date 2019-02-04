// @flow

import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { storiesOf } from '@storybook/react'

import Repository from './Repository'

storiesOf('Repository1', module).add('with default', () => (
  <MemoryRouter>
    <Repository
      match={{
        params: {
          owner: '$OWNER',
          repo: '$REPO',
          tree: '$TREE'
        }
      }}
      routes={[{}]}
      session={{}}
    >
      children
    </Repository>
  </MemoryRouter>
))
