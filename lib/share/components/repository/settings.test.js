import test        from 'ava'
import { shallow } from 'enzyme'
import React       from 'react'

import RepoSettings from './settings'

test('<RepoSettings /> test scaffold', (t) => {
  t.notThrows(() => {
    shallow(<RepoSettings />)
  })
})
