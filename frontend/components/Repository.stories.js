// @flow

import { storiesOf } from '@storybook/react'
import { base, filename } from 'paths.macro'
import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { storyname } from 'storybook-utils'

import Repository from './Repository'

storiesOf(storyname(base, filename), module).add('with default', () => (
  <MemoryRouter>
    <Repository
      match={{
        params: {
          owner: '$OWNER',
          repo: '$REPO',
          tree: '$TREE'
        }
      }}
      session={{}}
    >
      %CHILDREN%
    </Repository>
  </MemoryRouter>
))
