import test        from 'ava'
import { shallow } from 'enzyme'
import React       from 'react'

import RepoMilestones from './milestones'

test('<RepoMilestones /> test scaffold', (t) => {
  t.notThrows(() => {
    shallow(<RepoMilestones />)
  })
})
