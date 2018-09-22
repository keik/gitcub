// @flow

import test from 'tape'
import { shallow } from 'enzyme'
import React from 'react'

import RepoMilestones from './Milestones'

test('<RepoMilestones /> test scaffold', t => {
  t.doesNotThrow(() => {
    shallow(<RepoMilestones />)
  })
  t.end()
})
