import tape from 'tape'
import app from '../lib/server/app'

tape('a', t => {
  app.listen(() => {
    console.log('aaaaaaaaaaa')
  })
  t.end()
})
