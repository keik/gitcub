// @flow

import test from 'tape'
import { shallow } from 'enzyme'
import React from 'react'

import RepoWiki from './Wiki'

test('<RepoWiki /> test scaffold', t => {
  t.doesNotThrow(() => {
    shallow(<RepoWiki />)
  })
  t.end()
})