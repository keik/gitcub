// @flow

import { storiesOf } from '@storybook/react'
import { base, filename } from 'paths.macro'
import * as React from 'react'
import { storyname } from 'storybook-utils'

import Panel from './Panel'

storiesOf(storyname(base, filename), module)
  .add('default', () => (
    <Panel>
      <Panel.Header>HEADER</Panel.Header>
      <Panel.Body>BODY</Panel.Body>
    </Panel>
  ))
  .add('info', () => (
    <Panel>
      <Panel.Header info>HEADER</Panel.Header>
      <Panel.Body>BODY</Panel.Body>
    </Panel>
  ))
  .add('noPadidng', () => (
    <Panel>
      <Panel.Header noPadding>HEADER</Panel.Header>
      <Panel.Body noPadding>BODY</Panel.Body>
    </Panel>
  ))
