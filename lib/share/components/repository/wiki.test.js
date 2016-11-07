import test        from 'ava'
import { shallow } from 'enzyme'
import React       from 'react'

import RepoWiki from './wiki'

test('<RepoWiki /> test scaffold', (t) => {
  t.notThrows(() => {
    shallow(<RepoWiki />)
  })
})
