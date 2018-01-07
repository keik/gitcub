import test from 'tape'
import { shallow } from 'enzyme'
import React from 'react'

import Footer from './footer'

test('<Footer /> with no props should throw no errors', t => {
  t.doesNotThrow(() => {
    shallow(<Footer />)
  })
  t.end()
})
