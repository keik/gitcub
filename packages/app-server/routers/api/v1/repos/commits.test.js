// @flow

import assert from 'assert'
import { API_REPOS_COMMITS } from 'app-constants/api'
import axios from 'axios'

test(`GET ${API_REPOS_COMMITS} with no param should return commits in default branch`, async () => {
  const res = await axios.get(
    `http://localhost:8001/api/v1/repos/user1/repo1/commits`
  )

  // console.log(require('util').inspect(res.data[0], false, null))
  assert(res.data.length === 8)
  assert.deepEqual(res.data[0], {
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
            'http://localhost:8000/api/v1/repos/user1/repo1/git/commits/f1582566910f7a5d41b47f0c93ed560e1e1fd8d0',
          sha: 'f1582566910f7a5d41b47f0c93ed560e1e1fd8d0'
        }
      ],
      sha: '0100c14d9341db683c43e47c6944ecb1616005bd',
      tree: {
        url:
          'http://localhost:8000/api/v1/repos/user1/repo1/git/trees/dfd076cc884b4554bab928f62123fb262c02ec6c',
        sha: 'dfd076cc884b4554bab928f62123fb262c02ec6c'
      },
      url:
        'http://localhost:8000/api/v1/repos/user1/repo1/git/commits/0100c14d9341db683c43e47c6944ecb1616005bd'
    },
    html_url:
      'http://localhost:8000/user1/repo1/commit/0100c14d9341db683c43e47c6944ecb1616005bd',
    parents: [
      {
        url:
          'http://localhost:8000/api/v1/repos/user1/repo1/commits/f1582566910f7a5d41b47f0c93ed560e1e1fd8d0',
        sha: 'f1582566910f7a5d41b47f0c93ed560e1e1fd8d0'
      }
    ],
    sha: '0100c14d9341db683c43e47c6944ecb1616005bd',
    url:
      'http://localhost:8000/api/v1/repos/user1/repo1/commits/0100c14d9341db683c43e47c6944ecb1616005bd'
  })
})

test(`GET ${API_REPOS_COMMITS}/sha=SHA should return commits from specified SHA`, async () => {
  const res = await axios.get(
    `http://localhost:8001/api/v1/repos/user1/repo1/commits?sha=2394f21336aec34a5a225f1e8b9039593f1d1e27`
  )
  // console.log(require('util').inspect(res.data[0], false, null))
  assert(res.data.length === 5)
  assert.deepEqual(res.data[0], {
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
            'http://localhost:8000/api/v1/repos/user1/repo1/git/commits/297862f2168af863ae0e2735caabe8b7461f188f',
          sha: '297862f2168af863ae0e2735caabe8b7461f188f'
        }
      ],
      sha: '2394f21336aec34a5a225f1e8b9039593f1d1e27',
      tree: {
        url:
          'http://localhost:8000/api/v1/repos/user1/repo1/git/trees/ec03c563e29b0f50af9e561ad19f9df24dfe7e10',
        sha: 'ec03c563e29b0f50af9e561ad19f9df24dfe7e10'
      },
      url:
        'http://localhost:8000/api/v1/repos/user1/repo1/git/commits/2394f21336aec34a5a225f1e8b9039593f1d1e27'
    },
    html_url:
      'http://localhost:8000/user1/repo1/commit/2394f21336aec34a5a225f1e8b9039593f1d1e27',
    parents: [
      {
        url:
          'http://localhost:8000/api/v1/repos/user1/repo1/commits/297862f2168af863ae0e2735caabe8b7461f188f',
        sha: '297862f2168af863ae0e2735caabe8b7461f188f'
      }
    ],
    sha: '2394f21336aec34a5a225f1e8b9039593f1d1e27',
    url:
      'http://localhost:8000/api/v1/repos/user1/repo1/commits/2394f21336aec34a5a225f1e8b9039593f1d1e27'
  })
})

test(`GET ${API_REPOS_COMMITS}/sha=REF should return commits from specified SHA`, async () => {
  const res = await axios.get(
    `http://localhost:8001/api/v1/repos/user1/repo1/commits?sha=feature`
  )
  // console.log(require('util').inspect(res.data[0], false, null))
  assert(res.data.length === 5)
  assert.deepEqual(res.data[0], {
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
            'http://localhost:8000/api/v1/repos/user1/repo1/git/commits/297862f2168af863ae0e2735caabe8b7461f188f',
          sha: '297862f2168af863ae0e2735caabe8b7461f188f'
        }
      ],
      sha: '2394f21336aec34a5a225f1e8b9039593f1d1e27',
      tree: {
        url:
          'http://localhost:8000/api/v1/repos/user1/repo1/git/trees/ec03c563e29b0f50af9e561ad19f9df24dfe7e10',
        sha: 'ec03c563e29b0f50af9e561ad19f9df24dfe7e10'
      },
      url:
        'http://localhost:8000/api/v1/repos/user1/repo1/git/commits/2394f21336aec34a5a225f1e8b9039593f1d1e27'
    },
    html_url:
      'http://localhost:8000/user1/repo1/commit/2394f21336aec34a5a225f1e8b9039593f1d1e27',
    parents: [
      {
        url:
          'http://localhost:8000/api/v1/repos/user1/repo1/commits/297862f2168af863ae0e2735caabe8b7461f188f',
        sha: '297862f2168af863ae0e2735caabe8b7461f188f'
      }
    ],
    sha: '2394f21336aec34a5a225f1e8b9039593f1d1e27',
    url:
      'http://localhost:8000/api/v1/repos/user1/repo1/commits/2394f21336aec34a5a225f1e8b9039593f1d1e27'
  })
})

test(`GET ${API_REPOS_COMMITS} with SHA should return a specified commit`, async () => {
  const res = await axios.get(
    `http://localhost:8001/api/v1/repos/user1/repo1/commits/f1582566910f7a5d41b47f0c93ed560e1e1fd8d0`
  )
  // console.log(require('util').inspect(res.data, false, null))
  res.data.files.sort((a, b) => a.filename > b.filename)
  assert.deepEqual(res.data, {
    commit: {
      author: {
        name: 'keik',
        email: 'k4t0.kei@gmail.com',
        date: '2016-09-27T11:12:31.000Z'
      },
      committer: {
        name: 'keik',
        email: 'k4t0.kei@gmail.com',
        date: '2016-09-27T02:42:37.000Z'
      },
      message: 'Add codes\n',
      parents: [
        {
          url:
            'http://localhost:8000/api/v1/repos/user1/repo1/git/commits/9e20f2d7bdcc5027cc0a8083f07f32e1a0d1f34d',
          sha: '9e20f2d7bdcc5027cc0a8083f07f32e1a0d1f34d'
        }
      ],
      sha: 'f1582566910f7a5d41b47f0c93ed560e1e1fd8d0',
      tree: {
        url:
          'http://localhost:8000/api/v1/repos/user1/repo1/git/trees/dde07dc1ebe9119f0abfb6c64c7813e64e9ff723',
        sha: 'dde07dc1ebe9119f0abfb6c64c7813e64e9ff723'
      },
      url:
        'http://localhost:8000/api/v1/repos/user1/repo1/git/commits/f1582566910f7a5d41b47f0c93ed560e1e1fd8d0'
    },
    html_url:
      'http://localhost:8000/user1/repo1/commit/f1582566910f7a5d41b47f0c93ed560e1e1fd8d0',
    parents: [
      {
        url:
          'http://localhost:8000/api/v1/repos/user1/repo1/commits/9e20f2d7bdcc5027cc0a8083f07f32e1a0d1f34d',
        sha: '9e20f2d7bdcc5027cc0a8083f07f32e1a0d1f34d'
      }
    ],
    sha: 'f1582566910f7a5d41b47f0c93ed560e1e1fd8d0',
    url:
      'http://localhost:8000/api/v1/repos/user1/repo1/commits/f1582566910f7a5d41b47f0c93ed560e1e1fd8d0',
    files: [
      {
        sha: 'deb8561a16afdee514523b1f3ea6bd32d3287fa2',
        filename: 'codes/file.js',
        status: 'added',
        additions: 3,
        deletions: 0,
        changes: 3,
        blob_url:
          'http://localhost:8000/user1/repo1}/blob/f1582566910f7a5d41b47f0c93ed560e1e1fd8d0/codes/file.js',
        raw_url:
          'http://localhost:8000/user1/repo1/raw/f1582566910f7a5d41b47f0c93ed560e1e1fd8d0/codes/file.js',
        contents_url:
          'http://localhost:8000/repos/user1/repo1/contents/codes/file.js}?ref=:sha',
        patch:
          "@@ -0,0 +1,3 @@\n+function f() {\n+  console.log('Hello JavaScript')\n+}"
      },
      {
        sha: '7b5e06f87463a1c164155523151fd3f90b585049',
        filename: 'codes/file.md',
        status: 'added',
        additions: 11,
        deletions: 0,
        changes: 11,
        blob_url:
          'http://localhost:8000/user1/repo1}/blob/f1582566910f7a5d41b47f0c93ed560e1e1fd8d0/codes/file.md',
        raw_url:
          'http://localhost:8000/user1/repo1/raw/f1582566910f7a5d41b47f0c93ed560e1e1fd8d0/codes/file.md',
        contents_url:
          'http://localhost:8000/repos/user1/repo1/contents/codes/file.md}?ref=:sha',
        patch:
          "@@ -0,0 +1,11 @@\n+# Hello Markdown\n+\n+This is plain text\n+\n+```js\n+console.log('This is JavaScript code')\n+```\n+\n+```ruby\n+puts 'This is Ruby code'\n+```"
      },
      {
        sha: 'b97038f29f6d581aa86d6417f9ed464c1cdfeba2',
        filename: 'codes/file.rb',
        status: 'added',
        additions: 1,
        deletions: 0,
        changes: 1,
        blob_url:
          'http://localhost:8000/user1/repo1}/blob/f1582566910f7a5d41b47f0c93ed560e1e1fd8d0/codes/file.rb',
        raw_url:
          'http://localhost:8000/user1/repo1/raw/f1582566910f7a5d41b47f0c93ed560e1e1fd8d0/codes/file.rb',
        contents_url:
          'http://localhost:8000/repos/user1/repo1/contents/codes/file.rb}?ref=:sha',
        patch: "@@ -0,0 +1 @@\n+puts 'Hello Ruby'"
      }
    ],
    stats: { total: 15, additions: 15, deletions: 0 }
  })
})

test(`GET ${API_REPOS_COMMITS} from no exists repo should return 404`, async () => {
  const res = await axios
    .get(`http://localhost:8001/api/v1/repos/no_exists_user/foo/commits`)
    .catch(e => e.response)
  assert(res.status === 404)
})
