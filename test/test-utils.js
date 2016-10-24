import test from 'ava'

import * as utils from '../lib/server/utils'

test('utils.renderFullPage should contain specified contents, props and entrypoint as HTML string', (t) => {
  const html = utils.renderFullPage('<p>hello world</p>', { foo: 1 }, 'main')
  t.not(html.match(RegExp('<p>hello world</p>')), null)
  t.not(html.match(RegExp('main.js')), null)
  t.not(html.match(RegExp(`APP_PROPS = ${JSON.stringify({ foo: 1 })}`)), null)
})
