import test        from 'ava'
import { shallow } from 'enzyme'
import React       from 'react'

test('<App /> with no props should throw no errors', (t) => {
  const App = require('./app').default
  t.notThrows(() => {
    shallow(<App />)
  })
})
test('<App /> has a DevTools element in development', (t) => {
  const App = require('./app.dev').default
  const wrapper = shallow(<App />)
  t.is(wrapper.find('DevTools').length, 1)
})
test('<App /> has no DevTools element in production', (t) => {
  const App = require('./app.prod').default
  const wrapper = shallow(<App />)
  t.is(wrapper.find('DevTools').length, 0)
})
