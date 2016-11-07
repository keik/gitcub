import test        from 'ava'
import { shallow } from 'enzyme'
import React       from 'react'

import RepoHome from './home'

test('<RepoHome /> with no props should throw error', (t) => {
  t.throws(() => {
    shallow(<RepoHome />)
  })
})
