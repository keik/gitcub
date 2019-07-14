// @flow

import assert from 'assert'
import { API_REPOS_BRANCHES } from 'app-constants/api'
import axios from 'axios'

test(`GET ${API_REPOS_BRANCHES} with no param should return branches in default branch`, async () => {
  const res = await axios.get(
    `http://localhost:8001/api/v1/repos/user1/repo1/branches`
  )
  // console.log(require('util').inspect(res.data, false, null))
  assert.deepEqual(
    res.data.sort((a, b) =>
      a.commit.author.date > b.commit.author.date
        ? 1
        : a.commit.author.date < b.commit.author.date
        ? -1
        : 0
    ),
    [
      {
        name: 'feature',
        commit: {
          author: {
            name: 'keik',
            email: 'k4t0.kei@gmail.com',
            date: '2016-09-26T15:08:24.000Z'
          },
          committer: {
            name: 'keik',
            email: 'k4t0.kei@gmail.com',
            date: '2016-09-27T01:08:48.000Z'
          },
          message: 'Add `!` to file2\n',
          parents: [
            {
              url:
                'http://localhost:8000/api/v1/repos/undefined/undefined/git/commits/297862f2168af863ae0e2735caabe8b7461f188f',
              sha: '297862f2168af863ae0e2735caabe8b7461f188f'
            }
          ],
          sha: '2394f21336aec34a5a225f1e8b9039593f1d1e27',
          tree: {
            url:
              'http://localhost:8000/api/v1/repos/undefined/undefined/git/trees/ec03c563e29b0f50af9e561ad19f9df24dfe7e10',
            sha: 'ec03c563e29b0f50af9e561ad19f9df24dfe7e10'
          },
          url:
            'http://localhost:8000/api/v1/repos/undefined/undefined/git/commits/2394f21336aec34a5a225f1e8b9039593f1d1e27'
        }
      },
      {
        name: 'master',
        commit: {
          author: {
            name: 'keik',
            email: 'k4t0.kei@gmail.com',
            date: '2016-10-24T14:13:53.000Z'
          },
          committer: {
            name: 'keik',
            email: 'k4t0.kei@gmail.com',
            date: '2016-10-24T14:13:53.000Z'
          },
          message: 'Add nested file\n',
          parents: [
            {
              url:
                'http://localhost:8000/api/v1/repos/undefined/undefined/git/commits/f1582566910f7a5d41b47f0c93ed560e1e1fd8d0',
              sha: 'f1582566910f7a5d41b47f0c93ed560e1e1fd8d0'
            }
          ],
          sha: '0100c14d9341db683c43e47c6944ecb1616005bd',
          tree: {
            url:
              'http://localhost:8000/api/v1/repos/undefined/undefined/git/trees/dfd076cc884b4554bab928f62123fb262c02ec6c',
            sha: 'dfd076cc884b4554bab928f62123fb262c02ec6c'
          },
          url:
            'http://localhost:8000/api/v1/repos/undefined/undefined/git/commits/0100c14d9341db683c43e47c6944ecb1616005bd'
        }
      }
    ].sort((a, b) =>
      a.commit.author.date > b.commit.author.date
        ? 1
        : a.commit.author.date < b.commit.author.date
        ? -1
        : 0
    )
  )
})

test(`GET ${API_REPOS_BRANCHES} from no exists repo should return 404`, async () => {
  const res = await axios
    .get(`http://localhost:8001/api/v1/repos/no_exists_user/foo/branches`)
    .catch(e => e.response)
  assert(res.status === 404)
})
