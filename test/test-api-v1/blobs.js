import test from 'ava'
import axios from 'axios'

import { API_BLOBS } from '../../lib/server/routers/api/v1'

export default function(config) {
  test.cb(`GET ${API_BLOBS} with no parameter should return 404`, (t) => {
    axios.get(`http://localhost:${config.PORT}/api/v1/repos/user1/repo1/git/blobs`)
      .then((res) => {
        t.fail(res.toString())
      }).catch((err) => {
        t.is(err.response.status, 404)
      }).finally(t.end)
  })

  test.cb(`GET ${API_BLOBS} with SHA should return file info`, (t) => {
    axios.get(`http://localhost:${config.PORT}/api/v1/repos/user1/repo1/git/blobs/b97038f29f6d581aa86d6417f9ed464c1cdfeba2`)
      .then((res) => {
        t.deepEqual(res.data,
          { bytes: 18,
            content: 'puts \'Hello Ruby\'\n',
            lines: 1,
            sha: 'b97038f29f6d581aa86d6417f9ed464c1cdfeba2' }
        )
      }).catch((err) => {
        console.error(err)
        t.fail(err.toString())
      }).finally(t.end)
  })

  test.cb(`GET ${API_BLOBS} with REFERENCE/PATH should return file info`, (t) => {
    axios.get(`http://localhost:${config.PORT}/api/v1/repos/user1/repo1/git/blobs/master/file1`)
      .then((res) => {
        t.deepEqual(res.data,
          { bytes: 6,
            content: 'hello\n',
            lines: 1,
            sha: 'ce013625030ba8dba906f756967f9e9ca394464a' }
        )
      }).catch((err) => {
        console.error(err)
        t.fail(err.toString())
      }).finally(t.end)
  })

  test.cb(`GET ${API_BLOBS} with REFERENCE/NESTED_PATH should return file info`, (t) => {
    axios.get(`http://localhost:${config.PORT}/api/v1/repos/user1/repo1/git/blobs/master/d/dd/nested`)
      .then((res) => {
        t.deepEqual(res.data,
          { bytes: 8,
            content: 'in deep\n',
            lines: 1,
            sha: '319b14e6a0dfee9ed07d56a90d40ff852ec63672' }
        )
      }).catch((err) => {
        console.error(err)
        t.fail(err.toString())
      }).finally(t.end)
  })

  test.cb(`GET ${API_BLOBS} with SHA/PATH should return file info`, (t) => {
    axios.get(`http://localhost:${config.PORT}/api/v1/repos/user1/repo1/git/blobs/f1582566910f7a5d41b47f0c93ed560e1e1fd8d0/file1`)
      .then((res) => {
        t.deepEqual(res.data,
          { bytes: 6,
            content: 'hello\n',
            lines: 1,
            sha: 'ce013625030ba8dba906f756967f9e9ca394464a' }
        )
      }).catch((err) => {
        console.error(err)
        t.fail(err.toString())
      }).finally(t.end)
  })
}
