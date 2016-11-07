import test        from 'ava'
import { shallow } from 'enzyme'
import React       from 'react'

import User from './index'

test('<User /> test scaffold', (t) => {
  t.notThrows(() => {
    shallow(<User />)
  })
})
