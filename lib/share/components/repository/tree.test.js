import test from 'tape'
import { shallow } from 'enzyme'
import React from 'react'

import RepoTree from './tree'

test('<RepoTree /> with no props should throw no errors', t => {
  t.doesNotThrow(() => {
    shallow(<RepoTree />)
  })
  t.end()
})
