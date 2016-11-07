import test        from 'ava'
import { shallow } from 'enzyme'
import React       from 'react'

import Header from './header'

test('<Header /> with no props should throw no errors', (t) => {
  t.notThrows(() => {
    shallow(<Header />)
  })
})
