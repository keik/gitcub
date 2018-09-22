// @flow

import test from 'tape'
import { shallow } from 'enzyme'
import React from 'react'

import RepoIssues from './Issues'

test('<RepoIssues /> with no props should throw error', t => {
  t.throws(() => {
    shallow(<RepoIssues {...({}: any)} />)
  })
  t.end()
})
