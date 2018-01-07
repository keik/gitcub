import test from 'tape'
import { shallow } from 'enzyme'
import React from 'react'

import RepoFileContent from './file-content'

test('<RepoFileContent /> with no props should throw error', t => {
  t.throws(() => {
    shallow(<RepoFileContent />)
  })
  t.end()
})
test('<RepoFileContent /> with plain-text file should render content as plain text', t => {
  const props = {
    content: 'function a() {}',
    contributors: ['alice', 'bob', 'carol'],
    size: 10,
    params: { owner: 'foo', repo: 'bar', splat: 'plain' }
  }
  const wrapper = shallow(<RepoFileContent {...props} />)
  t.is(wrapper.find('#contributors > Link').length, 3)
  t.is(
    wrapper.find('#content').html(),
    '<code class="hljs" id="content">function a() {}</code>'
  )
  t.end()
})
test('<RepoFileContent /> with JavaScript file should render content as JavaScript code', t => {
  const props = {
    content: 'function a() {}',
    contributors: ['alice', 'bob', 'carol'],
    size: 10,
    params: { owner: 'foo', repo: 'bar', splat: 'baz.js' }
  }
  const wrapper = shallow(<RepoFileContent {...props} />)
  t.is(
    wrapper.find('#content').html(),
    '<code class="hljs" id="content"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>) </span>{}</code>'
  )
  t.end()
})
