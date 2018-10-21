// @flow

import * as React from 'react'
import renderer from 'react-test-renderer'

import Footer from './Footer'

test('<Footer /> snapshot', () => {
  const tree = renderer.create(<Footer />).toJSON()
  expect(tree).toMatchSnapshot()
})
