// @flow

import initStoryshots, {
  multiSnapshotWithOptions
} from '@storybook/addon-storyshots'
import registerRequireContextHook from 'babel-plugin-require-context-hook/register'
import { addSerializer } from 'jest-specific-snapshot'
import 'jest-styled-components'
import styleSheetSerializer from 'jest-styled-components/src/styleSheetSerializer'

registerRequireContextHook()

addSerializer(styleSheetSerializer)

initStoryshots({
  test: multiSnapshotWithOptions({})
})
