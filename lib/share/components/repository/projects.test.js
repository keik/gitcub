import test from 'tape'
import { shallow } from 'enzyme'
import React from 'react'

import RepoProjects from './projects'

test('<RepoProjects /> test scaffold', t => {
  t.doesNotThrow(() => {
    shallow(<RepoProjects />)
  })
  t.end()
})
