import test        from 'tape'
import { shallow } from 'enzyme'
import React       from 'react'

import RepoMilestones from './milestones'

test('<RepoMilestones /> test scaffold', (t) => {
  t.doesNotThrow(() => {
    shallow(<RepoMilestones />)
  })
  t.end()
})
