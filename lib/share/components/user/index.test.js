import test from 'tape'
import { shallow } from 'enzyme'
import React from 'react'

import User from './index'

test('<User /> test scaffold', t => {
  t.doesNotThrow(() => {
    shallow(<User />)
  })
  t.end()
})
