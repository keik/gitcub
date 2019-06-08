import { storiesOf } from '@storybook/react'
import * as React from 'react'

import { Hello, StyledHello } from './Hello'

storiesOf('Hello', module)
  .add('default', () => <Hello name="a" />)
  .add('styled', () => <StyledHello name="a" />)
