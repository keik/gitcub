// @flow

import test from 'tape'
import { shallow } from 'enzyme'
import React from 'react'

import TreeSelector from './tree-selector'

test('<TreeSelector /> with empty `branches` and `tags` props should render empty selector', t => {
  const props = {
    branches: [],
    params: { owner: 'foo', repo: 'bar', tree: 'TREE' },
    tags: []
  }
  const wrapper = shallow(<TreeSelector {...props} />)
  t.is(wrapper.find('TabPanel[name="branches"] li').length, 0)
  t.is(wrapper.find('TabPanel[name="tags"] li').length, 0)
  t.end()
})
test('<TreeSelector /> with 2 `branches` and 2 `tags` props should render selectors each items', t => {
  const props = {
    branches: ([{ name: 'b1' }, { name: 'b2' }]: any),
    params: { owner: 'foo', repo: 'bar', tree: 'TREE' },
    tags: [{ ref: 't1' }, { ref: 't2' }, { ref: 't3' }]
  }
  const wrapper = shallow(<TreeSelector {...props} />)
  t.is(wrapper.find('TabPanel[name="branches"] li').length, 2)
  t.is(wrapper.find('TabPanel[name="tags"] li').length, 3)
  t.end()
})
