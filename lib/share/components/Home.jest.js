// @flow

import * as React from 'react'
import renderer from 'react-test-renderer'

import { Home } from './Home'

test('<Home /> snapshot', () => {
  const tree = renderer
    .create(
      <Home
        repositories={[
          { full_name: 'FULL_NAME1' },
          { full_name: 'FULL_NAME2' },
          { full_name: 'FULL_NAME3' }
        ]}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
