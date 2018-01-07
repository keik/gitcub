import test from 'tape'
import { shallow } from 'enzyme'
import React from 'react'

import New from './new'

test('<New /> with no props should throw no errors', t => {
  t.doesNotThrow(() => {
    shallow(<New />)
  })
  t.end()
})
