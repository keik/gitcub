import test from 'ava'
import axios from 'axios'

import { API_GIT_COMMITS } from '../../lib/server/routers/api/v1'

export default function(config) {
  test.cb(`GET ${API_GIT_COMMITS} with SHA should return a specified commit`, (t) => {
    axios.get(`http://localhost:${config.PORT}/api/v1/repos/user1/repo1/git/commits/0100c14d9341db683c43e47c6944ecb1616005bd`)
      .then((res) => {
        t.deepEqual(res.data,
          { author:
            { date: '2016-10-24T14:13:53.000Z',
              email: 'k4t0.kei@gmail.com',
              name: 'keik' },
            committer:
            { date: '2016-10-24T14:13:53.000Z',
              email: 'k4t0.kei@gmail.com',
              name: 'keik' },
            message: 'Add nested file\n',
            parents:
            [ { url: '/api/v1/repos/user1/repo1/git/commits/f1582566910f7a5d41b47f0c93ed560e1e1fd8d0',
              sha: 'f1582566910f7a5d41b47f0c93ed560e1e1fd8d0' } ],
            sha: '0100c14d9341db683c43e47c6944ecb1616005bd',
            tree:
            { url: '/api/v1/repos/user1/repo1/git/trees(/dfd076cc884b4554bab928f62123fb262c02ec6c)?',
              sha: 'dfd076cc884b4554bab928f62123fb262c02ec6c' },
            url: '/git/commits/0100c14d9341db683c43e47c6944ecb1616005bd' }
        )
      })
      .catch((err) => {
        t.fail(err.toString())
      }).finally(t.end)
  })
}
