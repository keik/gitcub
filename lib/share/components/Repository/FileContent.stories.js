// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'

import { FileContent } from './FileContent'

storiesOf('FileContent', module).add('with default', () => (
  <FileContent
    contributors={['$CONTRIBUTOR_1', '$CONTRIBUTOR_2']}
    entry={{
      content: '$CONTENT',
      name: '$NAME',
      path: '$PATH',
      sha: '$SHA',
      size: 10,
      type: '$TYPE',
      url: '$URL'
    }}
    params={{
      branch: '$BRANCH',
      owner: '$OWNER',
      repo: '$REPO',
      splat: '$SPLAT'
    }}
  />
))
