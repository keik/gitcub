// @flow

import test from 'tape'
import { shallow } from 'enzyme'
import React from 'react'

import RepoPulse from './Pulse'

test('<RepoPulse /> test scaffold', t => {
  t.doesNotThrow(() => {
    shallow(<RepoPulse />)
  })
  t.end()
})
