// @flow

import test from 'tape'
import { shallow } from 'enzyme'
import React from 'react'

import Header from './header'

test('<Header /> with no props should throw no errors', t => {
  t.doesNotThrow(() => {
    shallow(<Header {...({}: any)} />)
  })
  t.end()
})
