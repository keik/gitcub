import test from 'ava'
import axios from 'axios'

import { API_TAGS } from '../../lib/share/constants/api'

export default function(config) {
  test.cb(`GET ${API_TAGS} should return 200 and name of tags`, (t) => {
    axios.get(`http://localhost:${config.PORT}/api/v1/repos/user1/repo1/tags`)
      .then((res) => {
        t.deepEqual(res.data, ['v1.0.0'])
      }).catch((err) => {
        t.fail(err.toString())
      }).finally(t.end)
  })
}
