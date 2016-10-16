import { configure } from '@kadira/storybook'

function loadStories() {
  require('../lib/share/stories')
}

configure(loadStories, module)
