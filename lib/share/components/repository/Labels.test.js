// @flow

import test from 'tape'
import { shallow } from 'enzyme'
import React from 'react'

import RepoLabels from './Labels'

test('<RepoLabels /> test scaffold', t => {
  t.doesNotThrow(() => {
    shallow(<RepoLabels />)
  })
  t.end()
})
