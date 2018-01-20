// @flow

import test from 'tape'
import { shallow } from 'enzyme'
import React from 'react'

import RepoCommits from './commits'

test('<RepoCommits /> with no props should throw error', t => {
  t.throws(() => {
    shallow(<RepoCommits {...({}: any)} />)
  })
  t.end()
})
