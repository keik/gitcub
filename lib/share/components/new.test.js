import test        from 'ava'
import { shallow } from 'enzyme'
import React       from 'react'

import New from './new'

test('<New /> with no props should throw no errors', (t) => {
  t.notThrows(() => {
    shallow(<New />)
  })
})
