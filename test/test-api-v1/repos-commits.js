import test from 'ava'
import axios from 'axios'

import { API_REPOS_COMMITS } from '../../lib/server/routers/api/v1'

export default function(config) {
  test.cb(`GET ${API_REPOS_COMMITS} with no param should return commits in default branch`, (t) => {
    axios.get(`http://localhost:${config.PORT}/api/v1/repos/user1/repo1/commits`)
      .then((res) => {
        t.deepEqual(res.data,
          [ { id: '0100c14d9341db683c43e47c6944ecb1616005bd',
            date: '2016-10-24T14:13:53.000Z',
            message: 'Add nested file\n' },
            { id: 'f1582566910f7a5d41b47f0c93ed560e1e1fd8d0',
              date: '2016-09-27T02:42:37.000Z',
              message: 'Add codes\n' },
            { id: '9e20f2d7bdcc5027cc0a8083f07f32e1a0d1f34d',
              date: '2016-09-27T02:40:41.000Z',
              message: 'Merge branch \'feature\'\n' },
            { id: '2394f21336aec34a5a225f1e8b9039593f1d1e27',
              date: '2016-09-27T01:08:48.000Z',
              message: 'Add `!` to file2\n' },
            { id: '297862f2168af863ae0e2735caabe8b7461f188f',
              date: '2016-09-27T01:08:08.000Z',
              message: 'Add file3\n' },
            { id: 'e801527fecc2efb3a2e710a21a226ca0abf9db63',
              date: '2016-09-25T04:15:47.000Z',
              message: 'Add d/file3\n' },
            { id: '3c27dc60c76be4a1f5b765cb141d0d22d871a2b6',
              date: '2016-09-24T05:48:36.000Z',
              message: 'Add file2\n' },
            { id: 'd29e783434a7fadfa5bbf7b361dfc20a83ad8722',
              date: '2016-09-24T05:48:16.000Z',
              message: 'Add file1\n' } ]
        )
      })
      .catch((err) => {
        t.fail(err.toString())
      }).finally(t.end)
  })

}
