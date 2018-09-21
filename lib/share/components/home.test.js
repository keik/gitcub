// @flow

import test from 'tape'
import React from 'react'
import { shallow } from 'enzyme'

import Home from './home'

test('<Home /> with 3 repositories should render each repositories', t => {
  const wrapper = shallow(
    <Home
      repositories={[
        { full_name: 'FULL_NAME1' },
        { full_name: 'FULL_NAME2' },
        { full_name: 'FULL_NAME3' }
      ]}
    />
  )
  t.is(wrapper.find(`.main li`).length, 3)
  t.end()
})
