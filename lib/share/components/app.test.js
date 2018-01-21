// @flow

import test from 'tape'
import { shallow } from 'enzyme'
import React from 'react'

test('<App /> has a DevTools element in development', t => {
  const App = require('./app.dev').default
  const wrapper = shallow(<App {...({}: any)} />)
  t.is(wrapper.find('DevTools').length, 1)
  t.end()
})
test('<App /> has no DevTools element in production', t => {
  const App = require('./app.prod').default
  const wrapper = shallow(<App {...({}: any)} />)
  t.is(wrapper.find('DevTools').length, 0)
  t.end()
})
