import test from 'ava'
import axios from 'axios'

export default function(config) {
  test.cb('GET /api/v1/users/:user/repositories/:repo/tags should return 200 and name of tags', (t) => {
    axios.get(`http://localhost:${config.PORT}/api/v1/users/user1/repositories/repo1/tags`)
      .then((res) => {
        t.deepEqual(res.data, ['v1.0.0'])
      }).catch((err) => {
        t.fail(err.toString())
      }).finally(t.end)
  })
}
