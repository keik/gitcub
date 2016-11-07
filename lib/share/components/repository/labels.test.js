import test        from 'ava'
import { shallow } from 'enzyme'
import React       from 'react'

import RepoLabels from './labels'

test('<RepoLabels /> test scaffold', (t) => {
  t.notThrows(() => {
    shallow(<RepoLabels />)
  })
})
