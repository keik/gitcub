// @flow

import test from 'tape'
import { shallow } from 'enzyme'
import React from 'react'

import { Commit } from './Commit'

test('<Commit /> with empty `files` should render no patches', t => {
  const props = {
    commit: {
      commit: {
        author: { name: 'alice', date: new Date().toISOString() },
        sha: 'SHA',
        message: 'MESSAGE'
      },
      files: [],
      parents: []
    },
    params: { owner: 'OWNER', repo: 'REPO', sha: 'SHA' }
  }
  // $FlowFixMe
  const wrapper = shallow(<Commit {...props} />)
  t.is(wrapper.find('#patches').children().length, 0)
  t.end()
})

test('<Commit /> with empty `files` should render no patches', t => {
  const props = {
    commit: {
      commit: {
        author: { name: 'alice', date: new Date().toISOString() },
        sha: 'SHA',
        message: 'MESSAGE'
      },
      files: [
        { changes: 1, filename: 'f1', patch: 'p1' },
        { changes: 1, filename: 'f2', patch: 'p2' }
      ],
      parents: []
    },
    params: { owner: 'OWNER', repo: 'REPO', sha: 'SHA' }
  }
  // $FlowFixMe
  const wrapper = shallow(<Commit {...props} />)
  t.is(wrapper.find('#patches').children().length, 2)
  t.end()
})
