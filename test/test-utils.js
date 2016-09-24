import test from 'ava'

import * as utils from '../lib/server/utils'

test('utils.renderFullPage should contain specified contents, props and entrypoint as HTML string', t => {
  const html = utils.renderFullPage('<p>hello world</p>', {foo: 1}, 'main')
  t.ok(html.match(RegExp('<p>hello world</p>')))
  t.ok(html.match(RegExp('main.js')))
  t.ok(html.match(RegExp('main.css')))
  t.ok(html.match(RegExp(`APP_PROPS = ${JSON.stringify({foo: 1})}`)))
})
