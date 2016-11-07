import test        from 'ava'
import { shallow } from 'enzyme'
import React       from 'react'

import TreeSelector from './tree-selector'

test('<TreeSelector /> with no props should throw error', (t) => {
  t.throws(() => {
    shallow(<TreeSelector />)
  })
})
test('<TreeSelector /> with no `branches` prop should throw error', (t) => {
  t.throws(() => {
    const props = {
      params: {owner: 'foo', repo: 'bar'},
      tags: [],
    }
    shallow(<TreeSelector {...props} />)
  })
})
test('<TreeSelector /> with no `tags` prop should throw error', (t) => {
  t.throws(() => {
    const props = {
      branches: [],
      params: {owner: 'foo', repo: 'bar'},
    }
    shallow(<TreeSelector {...props} />)
  })
})
test('<TreeSelector /> with empty `branches` and `tags` props should render empty selector', (t) => {
  const props = {
    branches: [],
    params: {owner: 'foo', repo: 'bar'},
    tags: [],
  }
  const wrapper = shallow(<TreeSelector {...props} />)
  t.is(wrapper.find('TabPanel[name="branches"] li').length, 0)
  t.is(wrapper.find('TabPanel[name="tags"] li').length, 0)
})
test('<TreeSelector /> with 2 `branches` and 2 `tags` props should render selectors each items', (t) => {
  const props = {
    branches: [{name: 'b1'}, {name: 'b2'}],
    params: {owner: 'foo', repo: 'bar'},
    tags: [{ref: 't1'}, {ref: 't2'}, {ref: 't3'}],
  }
  const wrapper = shallow(<TreeSelector {...props} />)
  t.is(wrapper.find('TabPanel[name="branches"] li').length, 2)
  t.is(wrapper.find('TabPanel[name="tags"] li').length, 3)
})
