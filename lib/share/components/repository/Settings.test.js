// @flow

import test from 'tape'
import { shallow } from 'enzyme'
import React from 'react'

import RepoSettings from './Settings'

test('<RepoSettings /> test scaffold', t => {
  t.doesNotThrow(() => {
    shallow(<RepoSettings />)
  })
  t.end()
})
