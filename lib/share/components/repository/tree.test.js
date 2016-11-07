import test        from 'ava'
import { shallow } from 'enzyme'
import React       from 'react'

import RepoTree from './tree'

test('<RepoTree /> with no props should throw no errors', (t) => {
  t.notThrows(() => {
    shallow(<RepoTree />)
  })
})
