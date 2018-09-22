// @flow

import test from 'tape'
import React from 'react'
import { shallow } from 'enzyme'

import Entries from './Entries'

test('<Entries /> with routing `params` and empty `entries` should render ', t => {
  const props = {
    params: { owner: 'foo', repo: 'bar', tree: 'TREE', splat: 'SPLAT' },
    entries: []
  }
  const wrapper = shallow(<Entries {...props} />)
  t.is(wrapper.find('tbody > tr').length, 0)
  t.end()
})
test('<Entries /> with routing `params` and empty `entries` should render ', t => {
  const props = {
    params: { owner: 'foo', repo: 'bar', tree: '', splat: '' },
    entries: [
      {
        lastCommit: {
          author: { date: new Date().toISOString(), name: 'NAME' },
          message: 'commit 1',
          sha: 'aaaaaaaaaaaaa'
        },
        path: 'aaa/x'
      },
      {
        lastCommit: {
          author: { date: new Date().toISOString(), name: 'NAME' },
          message: 'commit 2',
          sha: 'bbbbbbbbbbbbb'
        },
        path: 'bbb/y'
      }
    ]
  }
  const wrapper = shallow(<Entries {...props} />)
  t.is(wrapper.find('tbody > tr').length, 2)
  t.end()
})
