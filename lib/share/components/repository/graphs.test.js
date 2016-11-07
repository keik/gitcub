import test        from 'ava'
import { shallow } from 'enzyme'
import React       from 'react'

import RepoGraphs from './graphs'

test('<RepoGraphs /> test scaffold', (t) => {
  t.notThrows(() => {
    shallow(<RepoGraphs />)
  })
})
