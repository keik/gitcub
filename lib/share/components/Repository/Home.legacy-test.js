// @flow

import test from 'tape'
import { shallow } from 'enzyme'
import React from 'react'

import RepoHome from './Home'

test('<RepoHome /> with no props should throw error', t => {
  t.throws(() => {
    shallow(<RepoHome {...({}: any)} />)
  })
  t.end()
})
