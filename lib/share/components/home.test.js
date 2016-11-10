import test        from 'tape'
import React       from 'react'
import { shallow } from 'enzyme'

import Home   from './home'
import styles from './home.css'

test('<Home /> with 3 repositories should render each repositories', (t) => {
  const wrapper = shallow(<Home repositories={[1,2,3]} />)
  t.is(wrapper.find(`.${styles.repositories} > li`).length, 3)
  t.end()
})
