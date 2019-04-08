// @flow

import initStoryshots, {
  multiSnapshotWithOptions
} from '@storybook/addon-storyshots'
import registerRequireContextHook from 'babel-plugin-require-context-hook/register'
import 'jest-styled-components'

registerRequireContextHook()
initStoryshots({
  test: multiSnapshotWithOptions({})
})
