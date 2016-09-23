import tape from 'tape'
import axios from 'axios'
import fs from 'fs'
import mkdirp from 'mkdirp'

import app from '../lib/server/app'
import config from './config-for-test.json'

app.set('config', config)

let server
tape('setup', t => {
  server = app.listen(config.PORT, () => {
    // create repos directory
    if (!fs.existsSync(config.REPO_ROOT)) {
      mkdirp.sync(config.REPO_ROOT)
    }
    console.log(`start on port ${config.PORT}`)
  })
  t.end()
})

tape('GET /api/v1/repositories/:repoName/commits', t => {
  axios.get('http://localhost:3001/api/v1/repositries/repo1/commits')
    .then(res => {
      t.end()
    })
    .catch(err => {
      t.error(err)
      t.end()
    })
})

// tape('POST /api/v1/repositories', t => {
// })

tape('teardown', t => {
  server.close()
  t.end()
})
