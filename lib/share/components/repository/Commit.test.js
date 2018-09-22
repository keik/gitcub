// @flow

import test from 'tape'
import { shallow } from 'enzyme'
import React from 'react'

import RepoCommit from './Commit'

test('<RepoCommit /> with empty `files` should render no patches', t => {
  const props = {
    commit: {
      author: { name: 'alice', date: new Date().toISOString() },
      sha: 'SHA',
      message: 'MESSAGE'
    },
    files: [],
    params: { owner: 'OWNER', repo: 'REPO', sha: 'SHA' },
    parents: []
  }
  const wrapper = shallow(<RepoCommit {...props} />)
  t.is(wrapper.find('#patches').children().length, 0)
  t.end()
})

test('<RepoCommit /> with empty `files` should render no patches', t => {
  const props = {
    commit: {
      author: { name: 'alice', date: new Date().toISOString() },
      sha: 'SHA',
      message: 'MESSAGE'
    },
    files: [
      { changes: 1, filename: 'f1', patch: 'p1' },
      { changes: 1, filename: 'f2', patch: 'p2' }
    ],
    params: { owner: 'OWNER', repo: 'REPO', sha: 'SHA' },
    parents: []
  }
  const wrapper = shallow(<RepoCommit {...props} />)
  t.is(wrapper.find('#patches').children().length, 2)
  t.end()
})
