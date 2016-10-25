import test from 'ava'
import axios from 'axios'

export default function(config) {
  test.cb('GET /api/v1/repos/:owner/:repo/branches should return name of branches', (t) => {
    axios.get(`http://localhost:${config.PORT}/api/v1/repos/user1/repo1/branches`)
      .then((res) => {
        t.deepEqual(res.data.sort(), ['master', 'feature'].sort())
      }).catch((err) => {
        t.fail(err.toString())
      }).finally(t.end)
  })
}
