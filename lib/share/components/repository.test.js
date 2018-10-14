// @flow

import test from 'tape'
import { shallow } from 'enzyme'
import React from 'react'

import { Repository } from './Repository'

test('<Repository /> with no props should throw no errors', t => {
  t.doesNotThrow(() => {
    shallow(<Repository {...({}: any)} />)
  })
  t.end()
})
