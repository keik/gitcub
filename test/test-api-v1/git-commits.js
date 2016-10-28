import test from 'ava'
import axios from 'axios'

import { API_GIT_COMMITS } from '../../lib/server/routers/api/v1'

export default function(config) {
  test.cb(`GET ${API_GIT_COMMITS} with SHA should return a specified commit`, (t) => {
    axios.get(`http://localhost:${config.PORT}/api/v1/repos/user1/repo1/git/commits/0100c14d9341db683c43e47c6944ecb1616005bd`)
      .then((res) => {
        t.deepEqual(res.data,
          { id: '0100c14d9341db683c43e47c6944ecb1616005bd',
            date: '2016-10-24T14:13:53.000Z',
            message: 'Add nested file\n' }
        )
      })
      .catch((err) => {
        t.fail(err.toString())
      }).finally(t.end)
  })
}
