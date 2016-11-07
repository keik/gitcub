import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'

import Entries from './entries'

test('<Entries /> with no props should throw error', (t) => {
  t.throws(() => {
    shallow(<Entries />)
  })
})
test('<Entries /> with no `entries` prop should throw error', (t) => {
  t.throws(() => {
    const props = {params: {owner: 'foo', repo: 'bar'}}
    shallow(<Entries {...props} />)
  })
})
test('<Entries /> with routing `params` and empty `entries` should render ', (t) => {
  const props = {params: {owner: 'foo', repo: 'bar'}, entries: []}
  const wrapper = shallow(<Entries {...props} />)
  t.is(wrapper.find('tbody > tr').length, 0)
})
test('<Entries /> with routing `params` and empty `entries` should render ', (t) => {
  const props = {
    params: {owner: 'foo', repo: 'bar'},
    entries: [
      {lastCommit: {author: {date: new Date().toISOString()}, message: 'commit 1', sha: 'aaaaaaaaaaaaa'}, path: 'aaa/x'},
      {lastCommit: {author: {date: new Date().toISOString()}, message: 'commit 2', sha: 'bbbbbbbbbbbbb'}, path: 'bbb/y'},
    ]
  }
  const wrapper = shallow(<Entries {...props} />)
  t.is(wrapper.find('tbody > tr').length, 2)
})
