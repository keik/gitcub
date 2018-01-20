// @flow

import test from 'tape'
import { shallow } from 'enzyme'
import React from 'react'

import RepoPulse from './pulse'

test('<RepoPulse /> test scaffold', t => {
  t.doesNotThrow(() => {
    shallow(<RepoPulse />)
  })
  t.end()
})
