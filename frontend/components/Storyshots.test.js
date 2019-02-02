// @flow

import initStoryshots from '@storybook/addon-storyshots'
import 'jest-styled-components'

const registerRequireContextHook = require('babel-plugin-require-context-hook/register')

registerRequireContextHook()
initStoryshots()
