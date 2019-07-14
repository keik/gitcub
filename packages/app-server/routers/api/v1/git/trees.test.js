// @flow

import assert from 'assert'
import { API_GIT_TREES } from '@gitcub/constants/api'
import axios from 'axios'

test(`GET ${API_GIT_TREES} with no parameter should return name of entries in default branch`, async () => {
  const res = await axios.get(
    `http://localhost:8001/api/v1/repos/user1/repo1/git/trees`
  )
  res.data.tree.sort((a, b) => a.path > b.path)
  // console.log(require('util').inspect(res.data, false, null))
  assert.deepEqual(res.data, {
    url: 'http://localhost:8000/api/v1/repos/user1/repo1/git/trees/master',
    sha: 'master',
    tree: [
      {
        path: 'codes/file.js',
        type: 'blob',
        sha: 'deb8561a16afdee514523b1f3ea6bd32d3287fa2'
      },
      {
        path: 'codes/file.md',
        type: 'blob',
        sha: '7b5e06f87463a1c164155523151fd3f90b585049'
      },
      {
        path: 'codes/file.rb',
        type: 'blob',
        sha: 'b97038f29f6d581aa86d6417f9ed464c1cdfeba2'
      },
      {
        path: 'd/dd/nested',
        type: 'blob',
        sha: '319b14e6a0dfee9ed07d56a90d40ff852ec63672'
      },
      {
        path: 'd/file3',
        type: 'blob',
        sha: 'd2cebd4f0a9e97a48a6139d09cafdb513ad8fee3'
      },
      {
        path: 'file1',
        type: 'blob',
        sha: 'ce013625030ba8dba906f756967f9e9ca394464a'
      },
      {
        path: 'file2',
        type: 'blob',
        sha: '18df7980ddf987c2e3e20eb8007727c659b37216'
      },
      {
        path: 'file3',
        type: 'blob',
        sha: '57651f675c8e781cf377630612076c16b83fe780'
      }
    ]
  })
})

test(`GET ${API_GIT_TREES} with SHA should return name of entries`, async () => {
  const res = await axios.get(
    `http://localhost:8001/api/v1/repos/user1/repo1/git/trees/297862f2168af863ae0e2735caabe8b7461f188f`
  )
  res.data.tree.sort((a, b) => a.path > b.path)
  // console.log(require('util').inspect(res.data, false, null))
  assert.deepEqual(res.data, {
    url:
      'http://localhost:8000/api/v1/repos/user1/repo1/git/trees/297862f2168af863ae0e2735caabe8b7461f188f',
    sha: '297862f2168af863ae0e2735caabe8b7461f188f',
    tree: [
      {
        path: 'd/file3',
        type: 'blob',
        sha: 'd2cebd4f0a9e97a48a6139d09cafdb513ad8fee3'
      },
      {
        path: 'file1',
        type: 'blob',
        sha: 'ce013625030ba8dba906f756967f9e9ca394464a'
      },
      {
        path: 'file2',
        type: 'blob',
        sha: 'cc628ccd10742baea8241c5924df992b5c019f71'
      },
      {
        path: 'file3',
        type: 'blob',
        sha: '57651f675c8e781cf377630612076c16b83fe780'
      }
    ]
  })
})

test(`GET ${API_GIT_TREES} with REFERENCE should return name of entries`, async () => {
  const res = await axios.get(
    `http://localhost:8001/api/v1/repos/user1/repo1/git/trees/feature`
  )
  res.data.tree.sort((a, b) => a.path > b.path)
  // console.log(require('util').inspect(res.data, false, null))
  assert.deepEqual(res.data, {
    url: 'http://localhost:8000/api/v1/repos/user1/repo1/git/trees/feature',
    sha: 'feature',
    tree: [
      {
        path: 'd/file3',
        type: 'blob',
        sha: 'd2cebd4f0a9e97a48a6139d09cafdb513ad8fee3'
      },
      {
        path: 'file1',
        type: 'blob',
        sha: 'ce013625030ba8dba906f756967f9e9ca394464a'
      },
      {
        path: 'file2',
        type: 'blob',
        sha: '18df7980ddf987c2e3e20eb8007727c659b37216'
      },
      {
        path: 'file3',
        type: 'blob',
        sha: '57651f675c8e781cf377630612076c16b83fe780'
      }
    ]
  })
})

test(`GET ${API_GIT_TREES} with REFERENCE?last_commit should return name of entries with last_commit`, async () => {
  const res = await axios.get(
    `http://localhost:8001/api/v1/repos/user1/repo1/git/trees/297862f2168af863ae0e2735caabe8b7461f188f?last_commit=1`
  )
  // console.log(require('util').inspect(res.data, false, null))
  res.data.tree.sort((a, b) => a.path > b.path)

  assert.deepEqual(res.data, {
    url:
      'http://localhost:8000/api/v1/repos/user1/repo1/git/trees/297862f2168af863ae0e2735caabe8b7461f188f',
    sha: '297862f2168af863ae0e2735caabe8b7461f188f',
    tree: [
      {
        path: 'd/file3',
        type: 'blob',
        sha: 'd2cebd4f0a9e97a48a6139d09cafdb513ad8fee3',
        lastCommit: {
          author: {
            name: 'keik',
            email: 'k4t0.kei@gmail.com',
            date: '2016-09-25T04:15:47.000Z'
          },
          committer: {
            name: 'keik',
            email: 'k4t0.kei@gmail.com',
            date: '2016-09-25T04:15:47.000Z'
          },
          message: 'Add d/file3\n',
          parents: [
            {
              url:
                'http://localhost:8000/api/v1/repos/user1/repo1/git/commits/3c27dc60c76be4a1f5b765cb141d0d22d871a2b6',
              sha: '3c27dc60c76be4a1f5b765cb141d0d22d871a2b6'
            }
          ],
          sha: 'e801527fecc2efb3a2e710a21a226ca0abf9db63',
          tree: {
            url:
              'http://localhost:8000/api/v1/repos/user1/repo1/git/trees/20bd2419ce4536e4e62700550d23ba7c3233eed9',
            sha: '20bd2419ce4536e4e62700550d23ba7c3233eed9'
          },
          url:
            'http://localhost:8000/api/v1/repos/user1/repo1/git/commits/e801527fecc2efb3a2e710a21a226ca0abf9db63'
        }
      },
      {
        path: 'file1',
        type: 'blob',
        sha: 'ce013625030ba8dba906f756967f9e9ca394464a',
        lastCommit: {
          author: {
            name: 'keik',
            email: 'k4t0.kei@gmail.com',
            date: '2016-09-24T05:48:16.000Z'
          },
          committer: {
            name: 'keik',
            email: 'k4t0.kei@gmail.com',
            date: '2016-09-24T05:48:16.000Z'
          },
          message: 'Add file1\n',
          parents: [],
          sha: 'd29e783434a7fadfa5bbf7b361dfc20a83ad8722',
          tree: {
            url:
              'http://localhost:8000/api/v1/repos/user1/repo1/git/trees/d001d287018593691c36042e1c8089fde7415296',
            sha: 'd001d287018593691c36042e1c8089fde7415296'
          },
          url:
            'http://localhost:8000/api/v1/repos/user1/repo1/git/commits/d29e783434a7fadfa5bbf7b361dfc20a83ad8722'
        }
      },
      {
        path: 'file2',
        type: 'blob',
        sha: 'cc628ccd10742baea8241c5924df992b5c019f71',
        lastCommit: {
          author: {
            name: 'keik',
            email: 'k4t0.kei@gmail.com',
            date: '2016-09-24T05:48:36.000Z'
          },
          committer: {
            name: 'keik',
            email: 'k4t0.kei@gmail.com',
            date: '2016-09-24T05:48:36.000Z'
          },
          message: 'Add file2\n',
          parents: [
            {
              url:
                'http://localhost:8000/api/v1/repos/user1/repo1/git/commits/d29e783434a7fadfa5bbf7b361dfc20a83ad8722',
              sha: 'd29e783434a7fadfa5bbf7b361dfc20a83ad8722'
            }
          ],
          sha: '3c27dc60c76be4a1f5b765cb141d0d22d871a2b6',
          tree: {
            url:
              'http://localhost:8000/api/v1/repos/user1/repo1/git/trees/812bcf7a7db574cf24a2d6b8ed92cfd096c219e5',
            sha: '812bcf7a7db574cf24a2d6b8ed92cfd096c219e5'
          },
          url:
            'http://localhost:8000/api/v1/repos/user1/repo1/git/commits/3c27dc60c76be4a1f5b765cb141d0d22d871a2b6'
        }
      },
      {
        path: 'file3',
        type: 'blob',
        sha: '57651f675c8e781cf377630612076c16b83fe780',
        lastCommit: {
          author: {
            name: 'keik',
            email: 'k4t0.kei@gmail.com',
            date: '2016-09-26T15:07:53.000Z'
          },
          committer: {
            name: 'keik',
            email: 'k4t0.kei@gmail.com',
            date: '2016-09-27T01:08:08.000Z'
          },
          message: 'Add file3\n',
          parents: [
            {
              url:
                'http://localhost:8000/api/v1/repos/user1/repo1/git/commits/e801527fecc2efb3a2e710a21a226ca0abf9db63',
              sha: 'e801527fecc2efb3a2e710a21a226ca0abf9db63'
            }
          ],
          sha: '297862f2168af863ae0e2735caabe8b7461f188f',
          tree: {
            url:
              'http://localhost:8000/api/v1/repos/user1/repo1/git/trees/6be2dafb160ab380d886f5a9a488843653f4aaa3',
            sha: '6be2dafb160ab380d886f5a9a488843653f4aaa3'
          },
          url:
            'http://localhost:8000/api/v1/repos/user1/repo1/git/commits/297862f2168af863ae0e2735caabe8b7461f188f'
        }
      }
    ]
  })
})

test(`GET ${API_GIT_TREES} from no exists repo should return 404`, async () => {
  const res = await axios
    .get(`http://localhost:8001/api/v1/repos/no_exists_user/foo/git/treesaaa`)
    .catch(e => e.response)
  assert(res.status === 404)
})
