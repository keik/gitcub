import test        from 'tape'
import { shallow } from 'enzyme'
import React       from 'react'

import RepoGraphs from './graphs'

test('<RepoGraphs /> test scaffold', (t) => {
  t.doesNotThrow(() => {
    shallow(<RepoGraphs />)
  })
  t.end()
})
