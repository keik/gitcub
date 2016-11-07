import test        from 'ava'
import { shallow } from 'enzyme'
import React       from 'react'

import RepoBranches from './branches'

test('<RepoBranches /> with no props should throw error', (t) => {
  t.throws(() => {
    shallow(<RepoBranches />)
  })
})
