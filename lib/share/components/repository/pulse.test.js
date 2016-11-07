import test        from 'ava'
import { shallow } from 'enzyme'
import React       from 'react'

import RepoPulse from './pulse'

test('<RepoPulse /> test scaffold', (t) => {
  t.notThrows(() => {
    shallow(<RepoPulse />)
  })
})
