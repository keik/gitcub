import test        from 'ava'
import { shallow } from 'enzyme'
import React       from 'react'

import RepoProjects from './projects'

test('<RepoProjects /> test scaffold', (t) => {
  t.notThrows(() => {
    shallow(<RepoProjects />)
  })
})
