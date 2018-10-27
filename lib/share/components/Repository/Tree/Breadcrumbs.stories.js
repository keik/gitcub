// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'

import Breadcrumbs from './Breadcrumbs'

storiesOf('Repository/Breadcrumbs', module)
  .add('with default', () => (
    <Breadcrumbs
      params={{ owner: 'foo', repo: 'bar', tree: 'TREE', splat: 'SPLAT' }}
    />
  ))
  .add('with 3rd level path', () => (
    <Breadcrumbs
      params={{ owner: 'foo', repo: 'bar', tree: 'TREE', splat: 'a/b/c' }}
    />
  ))
