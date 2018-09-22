// @flow

import test from 'tape'
import { shallow } from 'enzyme'
import React from 'react'

import RepoGraphs from './Graphs'

test('<RepoGraphs /> test scaffold', t => {
  t.doesNotThrow(() => {
    shallow(<RepoGraphs />)
  })
  t.end()
})
