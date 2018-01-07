import test from 'tape'
import { shallow } from 'enzyme'
import React from 'react'

import RepoCommit from './commit'

test('<RepoCommit /> with no props should throw error', t => {
  t.throws(() => {
    shallow(<RepoCommit />)
  })
  t.end()
})

test('<RepoCommit /> with empty `files` should render no patches', t => {
  const props = {
    commit: { author: { name: 'alice', date: new Date().toISOString() } },
    files: [],
    params: { owner: 'foo', repo: 'bar' },
    parents: []
  }
  const wrapper = shallow(<RepoCommit {...props} />)
  t.is(wrapper.find('#patches').children().length, 0)
  t.end()
})

test('<RepoCommit /> with empty `files` should render no patches', t => {
  const props = {
    commit: { author: { name: 'alice', date: new Date().toISOString() } },
    files: [{ filename: 'f1', patch: 'p1' }, { filename: 'f2', patch: 'p2' }],
    params: { owner: 'foo', repo: 'bar' },
    parents: []
  }
  const wrapper = shallow(<RepoCommit {...props} />)
  t.is(wrapper.find('#patches').children().length, 2)
  t.end()
})
