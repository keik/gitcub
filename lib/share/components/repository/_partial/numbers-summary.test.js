import test from 'tape'
import { shallow } from 'enzyme'
import React from 'react'

import NumbersSummary from './numbers-summary'

test('<NumbersSummary /> with no props should throw error', t => {
  t.throws(() => {
    shallow(<NumbersSummary />)
  })
  t.end()
})

test('<NumbersSummary /> with no `branches` or `commits` or `tags` should throw error ', t => {
  const props = {
    params: { owner: 'foo', repo: 'bar' }
  }
  t.throws(() => {
    shallow(
      <NumbersSummary
        {...Object.assign({}, props, {
          /* branches: [], */ commits: [],
          tags: []
        })}
      />
    )
  })
  t.throws(() => {
    shallow(
      <NumbersSummary
        {...Object.assign({}, props, {
          branches: [],
          /* commits: [], */ tags: []
        })}
      />
    )
  })
  t.throws(() => {
    shallow(
      <NumbersSummary
        {...Object.assign({}, props, {
          branches: [],
          commits: [] /* tags: [] */
        })}
      />
    )
  })
  t.doesNotThrow(() => {
    shallow(
      <NumbersSummary
        {...Object.assign({}, props, { branches: [], commits: [], tags: [] })}
      />
    )
  })
  t.end()
})

test('<NumbersSummary /> with no `branches` or `commits` or `tags` should throw error ', t => {
  const props = {
    params: { owner: 'foo', repo: 'bar' },
    branches: [1],
    commits: [1, 2],
    tags: [1, 2, 3]
  }
  const wrapper = shallow(<NumbersSummary {...props} />)
  t.is(wrapper.find('Link[to="/foo/bar/branches"] span').text(), '1')
  t.is(wrapper.find(`Link[to="/foo/bar/commits"] span`).text(), '2')
  t.is(wrapper.find('Link[to="/foo/bar/releases"] span').text(), '3')
  t.end()
})
