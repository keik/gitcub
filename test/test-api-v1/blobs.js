import test from 'ava'
import axios from 'axios'

export default function(config) {
  test.cb('GET /api/v1/users/:user/repositories/:repo/branches/:branch/entries/:entry should return 200 and file info', (t) => {
    axios.get(`http://localhost:${config.PORT}/api/v1/users/user1/repositories/repo1/branches/master/entries/file1`)
      .then((res) => {
        t.deepEqual(res.data, {
          bytes: 12,
          content: 'hello\n',
          lines: 1,
        })
      }).catch((err) => {
        t.fail(err.toString())
      }).finally(t.end)
  })

  test.cb('GET /api/v1/users/:user/repositories/:repo/branches/:branch/entries/:entry should return 200 and file info', (t) => {
    axios.get(`http://localhost:${config.PORT}/api/v1/users/user1/repositories/repo1/branches/master/entries/file1`)
      .then((res) => {
        t.deepEqual(res.data, {
          bytes: 12,
          content: 'hello\n',
          lines: 1,
        })
      }).catch((err) => {
        t.fail(err.toString())
      }).finally(t.end)
  })
}
