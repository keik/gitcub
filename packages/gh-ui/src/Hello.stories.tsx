import { storiesOf } from '@storybook/react'
import * as React from 'react'

import { Hello, StyledHello } from './Hello'

storiesOf('Hello', module)
  .add('all', () => <Hello name="a" />)
  .add('all', () => <StyledHello name="a" />)
