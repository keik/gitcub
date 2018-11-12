// @flow

import * as emotion from 'emotion'
import { createSerializer } from 'jest-emotion'
import initStoryshots from '@storybook/addon-storyshots'
const registerRequireContextHook = require('babel-plugin-require-context-hook/register')

registerRequireContextHook()

initStoryshots({
  snapshotSerializers: [createSerializer(emotion)]
})
