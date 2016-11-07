import test        from 'ava'
import { shallow } from 'enzyme'
import React       from 'react'

import RepoIssues from './issues'

test('<RepoIssues /> with no props should throw error', (t) => {
  t.throws(() => {
    shallow(<RepoIssues />)
  })
})
