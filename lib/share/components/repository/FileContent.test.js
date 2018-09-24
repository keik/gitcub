// @flow

import test from 'tape'
import { shallow } from 'enzyme'
import React from 'react'

import { RepoFileContent } from './FileContent'

test('<RepoFileContent /> with plain-text file should render content as plain text', t => {
  const props = {
    contributors: ['alice', 'bob', 'carol'],
    entry: {
      content: 'function a() {}',
      size: 10
    },
    params: { branch: 'BRANCH', owner: 'OWNER', repo: 'BAR', splat: 'SPLAT' }
  }
  // $FlowFixMe
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
    contributors: ['alice', 'bob', 'carol'],
    entry: {
      content: 'function a() {}',
      size: 10
    },
    params: { branch: 'BRANCH', owner: 'OWNER', repo: 'BAR', splat: 'SPLAT.js' }
  }
  // $FlowFixMe
  const wrapper = shallow(<RepoFileContent {...props} />)
  t.is(
    wrapper.find('#content').html(),
    '<code class="hljs" id="content"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>) </span>{}</code>'
  )
  t.end()
})
