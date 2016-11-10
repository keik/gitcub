import test        from 'tape'
import { shallow } from 'enzyme'
import React       from 'react'

import Breadcrumbs from './breadcrumbs'

test('<Breadcrumbs /> with no props should throw error', (t) => {
  t.throws(() => {
    shallow(<Breadcrumbs />)
  })
  t.end()
})
test('<Breadcrumbs /> with no `splat` (path) should render a Link to repo', (t) => {
  const props = {
    params: {owner: 'foo', repo: 'bar'},
  }
  const wrapper = shallow(<Breadcrumbs {...props} />)
  t.is(wrapper.find('Link').length, 1)
  t.end()
})
test('<Breadcrumbs /> with 3rd level `splat` (path) should render three Links each dir', (t) => {
  const props = {
    params: {owner: 'foo', repo: 'bar', splat: 'a/b/c'},
  }
  const wrapper = shallow(<Breadcrumbs {...props} />)
  t.is(wrapper.find('Link').length, 3)
  t.is(wrapper.find('Link').at(0).props().to, '/foo/bar/tree/master')
  t.is(wrapper.find('Link').at(1).props().to, '/foo/bar/tree/master/a')
  t.is(wrapper.find('Link').at(2).props().to, '/foo/bar/tree/master/a/b')
  t.end()
})
