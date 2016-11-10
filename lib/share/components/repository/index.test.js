import test        from 'tape'
import { shallow } from 'enzyme'
import React       from 'react'

import Repository from './index'

test('<Repository /> with no props should throw no errors', (t) => {
  t.doesNotThrow(() => {
    shallow(<Repository />)
  })
  t.end()
})
