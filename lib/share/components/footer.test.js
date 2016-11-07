import test        from 'ava'
import { shallow } from 'enzyme'
import React       from 'react'

import Footer from './footer'

test('<Footer /> with no props should throw no errors', (t) => {
  t.notThrows(() => {
    shallow(<Footer />)
  })
})
