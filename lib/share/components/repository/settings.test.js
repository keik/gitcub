import test        from 'tape'
import { shallow } from 'enzyme'
import React       from 'react'

import RepoSettings from './settings'

test('<RepoSettings /> test scaffold', (t) => {
  t.doesNotThrow(() => {
    shallow(<RepoSettings />)
  })
  t.end()
})
