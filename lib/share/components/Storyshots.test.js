// @flow

import initStoryshots from '@storybook/addon-storyshots'
const registerRequireContextHook = require('babel-plugin-require-context-hook/register')

registerRequireContextHook()

initStoryshots()
