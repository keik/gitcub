// @flow

import * as React from 'react'
import renderer from 'react-test-renderer'

import Header from './Header'

test('<Header /> snapshot', () => {
  const tree = renderer.create(<Header session={undefined} />).toJSON()
  expect(tree).toMatchSnapshot()
})
