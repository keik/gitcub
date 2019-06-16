import { storiesOf } from '@storybook/react'
import * as React from 'react'

import { Button } from './Button'

storiesOf('Button', module)
  .add('default', () => <Button>Hoge</Button>)
  .add('primary', () => <Button primary>Hoge</Button>)
