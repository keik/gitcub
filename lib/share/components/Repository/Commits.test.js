// @flow

import test from 'tape'
import { shallow } from 'enzyme'
import React from 'react'

import { Commits } from './Commits'

test('<Commits /> with no props should throw error', t => {
  t.throws(() => {
    shallow(<Commits {...({}: any)} />)
  })
  t.end()
})
