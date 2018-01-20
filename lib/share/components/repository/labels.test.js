// @flow

import test from 'tape'
import { shallow } from 'enzyme'
import React from 'react'

import RepoLabels from './labels'

test('<RepoLabels /> test scaffold', t => {
  t.doesNotThrow(() => {
    shallow(<RepoLabels />)
  })
  t.end()
})
