import test        from 'ava'
import { shallow } from 'enzyme'
import React       from 'react'

import RepoHeader from './header'

test('<RepoHeader /> with no props should throw error', (t) => {
  t.throws(() => {
    shallow(<RepoHeader />)
  })
})
