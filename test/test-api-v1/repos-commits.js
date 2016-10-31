import test from 'ava'
import axios from 'axios'

import { API_REPOS_COMMITS } from '../../lib/server/routers/api/v1'

export default function(config) {
  test.cb(`GET ${API_REPOS_COMMITS} with no param should return commits in default branch`, (t) => {
    axios.get(`http://localhost:${config.PORT}/api/v1/repos/user1/repo1/commits`)
      .then((res) => {
        // console.log(require('util').inspect(res.data, false, null))
        t.deepEqual(res.data,
          [ { commit:
            { author:
              { name: 'keik',
                email: 'k4t0.kei@gmail.com',
                date: '2016-10-24T14:13:53.000Z' },
              committer:
              { name: 'keik',
                email: 'k4t0.kei@gmail.com',
                date: '2016-10-24T14:13:53.000Z' },
              message: 'Add nested file\n',
              parents:
              [ { url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/commits/f1582566910f7a5d41b47f0c93ed560e1e1fd8d0',
                sha: 'f1582566910f7a5d41b47f0c93ed560e1e1fd8d0' } ],
              sha: '0100c14d9341db683c43e47c6944ecb1616005bd',
              tree:
              { url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/trees/dfd076cc884b4554bab928f62123fb262c02ec6c',
                sha: 'dfd076cc884b4554bab928f62123fb262c02ec6c' },
              url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/commits/0100c14d9341db683c43e47c6944ecb1616005bd' },
            html_url: 'http://localhost:3000/user1/repo1/commit/0100c14d9341db683c43e47c6944ecb1616005bd',
            parents:
            [ { url: 'http://localhost:3000/api/v1/repos/user1/repo1/commits/f1582566910f7a5d41b47f0c93ed560e1e1fd8d0',
              sha: 'f1582566910f7a5d41b47f0c93ed560e1e1fd8d0' } ],
            sha: '0100c14d9341db683c43e47c6944ecb1616005bd',
            url: 'http://localhost:3000/api/v1/repos/user1/repo1/commits/0100c14d9341db683c43e47c6944ecb1616005bd' },
            { commit:
              { author:
                { name: 'keik',
                  email: 'k4t0.kei@gmail.com',
                  date: '2016-09-27T11:12:31.000Z' },
                committer:
                { name: 'keik',
                  email: 'k4t0.kei@gmail.com',
                  date: '2016-09-27T02:42:37.000Z' },
                message: 'Add codes\n',
                parents:
                [ { url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/commits/9e20f2d7bdcc5027cc0a8083f07f32e1a0d1f34d',
                  sha: '9e20f2d7bdcc5027cc0a8083f07f32e1a0d1f34d' } ],
                sha: 'f1582566910f7a5d41b47f0c93ed560e1e1fd8d0',
                tree:
                { url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/trees/dde07dc1ebe9119f0abfb6c64c7813e64e9ff723',
                  sha: 'dde07dc1ebe9119f0abfb6c64c7813e64e9ff723' },
                url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/commits/f1582566910f7a5d41b47f0c93ed560e1e1fd8d0' },
              html_url: 'http://localhost:3000/user1/repo1/commit/f1582566910f7a5d41b47f0c93ed560e1e1fd8d0',
              parents:
              [ { url: 'http://localhost:3000/api/v1/repos/user1/repo1/commits/9e20f2d7bdcc5027cc0a8083f07f32e1a0d1f34d',
                sha: '9e20f2d7bdcc5027cc0a8083f07f32e1a0d1f34d' } ],
              sha: 'f1582566910f7a5d41b47f0c93ed560e1e1fd8d0',
              url: 'http://localhost:3000/api/v1/repos/user1/repo1/commits/f1582566910f7a5d41b47f0c93ed560e1e1fd8d0' },
            { commit:
              { author:
                { name: 'keik',
                  email: 'k4t0.kei@gmail.com',
                  date: '2016-09-27T11:08:24.000Z' },
                committer:
                { name: 'keik',
                  email: 'k4t0.kei@gmail.com',
                  date: '2016-09-27T02:40:41.000Z' },
                message: 'Merge branch \'feature\'\n',
                parents:
                [ { url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/commits/e801527fecc2efb3a2e710a21a226ca0abf9db63',
                  sha: 'e801527fecc2efb3a2e710a21a226ca0abf9db63' },
                  { url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/commits/2394f21336aec34a5a225f1e8b9039593f1d1e27',
                    sha: '2394f21336aec34a5a225f1e8b9039593f1d1e27' } ],
                sha: '9e20f2d7bdcc5027cc0a8083f07f32e1a0d1f34d',
                tree:
                { url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/trees/ec03c563e29b0f50af9e561ad19f9df24dfe7e10',
                  sha: 'ec03c563e29b0f50af9e561ad19f9df24dfe7e10' },
                url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/commits/9e20f2d7bdcc5027cc0a8083f07f32e1a0d1f34d' },
              html_url: 'http://localhost:3000/user1/repo1/commit/9e20f2d7bdcc5027cc0a8083f07f32e1a0d1f34d',
              parents:
              [ { url: 'http://localhost:3000/api/v1/repos/user1/repo1/commits/e801527fecc2efb3a2e710a21a226ca0abf9db63',
                sha: 'e801527fecc2efb3a2e710a21a226ca0abf9db63' },
                { url: 'http://localhost:3000/api/v1/repos/user1/repo1/commits/2394f21336aec34a5a225f1e8b9039593f1d1e27',
                  sha: '2394f21336aec34a5a225f1e8b9039593f1d1e27' } ],
              sha: '9e20f2d7bdcc5027cc0a8083f07f32e1a0d1f34d',
              url: 'http://localhost:3000/api/v1/repos/user1/repo1/commits/9e20f2d7bdcc5027cc0a8083f07f32e1a0d1f34d' },
            { commit:
              { author:
                { name: 'keik',
                  email: 'k4t0.kei@gmail.com',
                  date: '2016-09-26T15:08:24.000Z' },
                committer:
                { name: 'keik',
                  email: 'k4t0.kei@gmail.com',
                  date: '2016-09-27T01:08:48.000Z' },
                message: 'Add `!` to file2\n',
                parents:
                [ { url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/commits/297862f2168af863ae0e2735caabe8b7461f188f',
                  sha: '297862f2168af863ae0e2735caabe8b7461f188f' } ],
                sha: '2394f21336aec34a5a225f1e8b9039593f1d1e27',
                tree:
                { url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/trees/ec03c563e29b0f50af9e561ad19f9df24dfe7e10',
                  sha: 'ec03c563e29b0f50af9e561ad19f9df24dfe7e10' },
                url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/commits/2394f21336aec34a5a225f1e8b9039593f1d1e27' },
              html_url: 'http://localhost:3000/user1/repo1/commit/2394f21336aec34a5a225f1e8b9039593f1d1e27',
              parents:
              [ { url: 'http://localhost:3000/api/v1/repos/user1/repo1/commits/297862f2168af863ae0e2735caabe8b7461f188f',
                sha: '297862f2168af863ae0e2735caabe8b7461f188f' } ],
              sha: '2394f21336aec34a5a225f1e8b9039593f1d1e27',
              url: 'http://localhost:3000/api/v1/repos/user1/repo1/commits/2394f21336aec34a5a225f1e8b9039593f1d1e27' },
            { commit:
              { author:
                { name: 'keik',
                  email: 'k4t0.kei@gmail.com',
                  date: '2016-09-26T15:07:53.000Z' },
                committer:
                { name: 'keik',
                  email: 'k4t0.kei@gmail.com',
                  date: '2016-09-27T01:08:08.000Z' },
                message: 'Add file3\n',
                parents:
                [ { url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/commits/e801527fecc2efb3a2e710a21a226ca0abf9db63',
                  sha: 'e801527fecc2efb3a2e710a21a226ca0abf9db63' } ],
                sha: '297862f2168af863ae0e2735caabe8b7461f188f',
                tree:
                { url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/trees/6be2dafb160ab380d886f5a9a488843653f4aaa3',
                  sha: '6be2dafb160ab380d886f5a9a488843653f4aaa3' },
                url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/commits/297862f2168af863ae0e2735caabe8b7461f188f' },
              html_url: 'http://localhost:3000/user1/repo1/commit/297862f2168af863ae0e2735caabe8b7461f188f',
              parents:
              [ { url: 'http://localhost:3000/api/v1/repos/user1/repo1/commits/e801527fecc2efb3a2e710a21a226ca0abf9db63',
                sha: 'e801527fecc2efb3a2e710a21a226ca0abf9db63' } ],
              sha: '297862f2168af863ae0e2735caabe8b7461f188f',
              url: 'http://localhost:3000/api/v1/repos/user1/repo1/commits/297862f2168af863ae0e2735caabe8b7461f188f' },
            { commit:
              { author:
                { name: 'keik',
                  email: 'k4t0.kei@gmail.com',
                  date: '2016-09-25T04:15:47.000Z' },
                committer:
                { name: 'keik',
                  email: 'k4t0.kei@gmail.com',
                  date: '2016-09-25T04:15:47.000Z' },
                message: 'Add d/file3\n',
                parents:
                [ { url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/commits/3c27dc60c76be4a1f5b765cb141d0d22d871a2b6',
                  sha: '3c27dc60c76be4a1f5b765cb141d0d22d871a2b6' } ],
                sha: 'e801527fecc2efb3a2e710a21a226ca0abf9db63',
                tree:
                { url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/trees/20bd2419ce4536e4e62700550d23ba7c3233eed9',
                  sha: '20bd2419ce4536e4e62700550d23ba7c3233eed9' },
                url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/commits/e801527fecc2efb3a2e710a21a226ca0abf9db63' },
              html_url: 'http://localhost:3000/user1/repo1/commit/e801527fecc2efb3a2e710a21a226ca0abf9db63',
              parents:
              [ { url: 'http://localhost:3000/api/v1/repos/user1/repo1/commits/3c27dc60c76be4a1f5b765cb141d0d22d871a2b6',
                sha: '3c27dc60c76be4a1f5b765cb141d0d22d871a2b6' } ],
              sha: 'e801527fecc2efb3a2e710a21a226ca0abf9db63',
              url: 'http://localhost:3000/api/v1/repos/user1/repo1/commits/e801527fecc2efb3a2e710a21a226ca0abf9db63' },
            { commit:
              { author:
                { name: 'keik',
                  email: 'k4t0.kei@gmail.com',
                  date: '2016-09-24T05:48:36.000Z' },
                committer:
                { name: 'keik',
                  email: 'k4t0.kei@gmail.com',
                  date: '2016-09-24T05:48:36.000Z' },
                message: 'Add file2\n',
                parents:
                [ { url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/commits/d29e783434a7fadfa5bbf7b361dfc20a83ad8722',
                  sha: 'd29e783434a7fadfa5bbf7b361dfc20a83ad8722' } ],
                sha: '3c27dc60c76be4a1f5b765cb141d0d22d871a2b6',
                tree:
                { url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/trees/812bcf7a7db574cf24a2d6b8ed92cfd096c219e5',
                  sha: '812bcf7a7db574cf24a2d6b8ed92cfd096c219e5' },
                url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/commits/3c27dc60c76be4a1f5b765cb141d0d22d871a2b6' },
              html_url: 'http://localhost:3000/user1/repo1/commit/3c27dc60c76be4a1f5b765cb141d0d22d871a2b6',
              parents:
              [ { url: 'http://localhost:3000/api/v1/repos/user1/repo1/commits/d29e783434a7fadfa5bbf7b361dfc20a83ad8722',
                sha: 'd29e783434a7fadfa5bbf7b361dfc20a83ad8722' } ],
              sha: '3c27dc60c76be4a1f5b765cb141d0d22d871a2b6',
              url: 'http://localhost:3000/api/v1/repos/user1/repo1/commits/3c27dc60c76be4a1f5b765cb141d0d22d871a2b6' },
            { commit:
              { author:
                { name: 'keik',
                  email: 'k4t0.kei@gmail.com',
                  date: '2016-09-24T05:48:16.000Z' },
                committer:
                { name: 'keik',
                  email: 'k4t0.kei@gmail.com',
                  date: '2016-09-24T05:48:16.000Z' },
                message: 'Add file1\n',
                parents: [],
                sha: 'd29e783434a7fadfa5bbf7b361dfc20a83ad8722',
                tree:
                { url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/trees/d001d287018593691c36042e1c8089fde7415296',
                  sha: 'd001d287018593691c36042e1c8089fde7415296' },
                url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/commits/d29e783434a7fadfa5bbf7b361dfc20a83ad8722' },
              html_url: 'http://localhost:3000/user1/repo1/commit/d29e783434a7fadfa5bbf7b361dfc20a83ad8722',
              parents: [],
              sha: 'd29e783434a7fadfa5bbf7b361dfc20a83ad8722',
              url: 'http://localhost:3000/api/v1/repos/user1/repo1/commits/d29e783434a7fadfa5bbf7b361dfc20a83ad8722' } ]
        )
      })
      .catch((err) => {
        t.fail(err.toString())
      }).finally(t.end)
  })

  test.cb(`GET ${API_REPOS_COMMITS} with SHA should return specified commit`, (t) => {
    axios.get(`http://localhost:${config.PORT}/api/v1/repos/user1/repo1/commits/f1582566910f7a5d41b47f0c93ed560e1e1fd8d0`)
      .then((res) => {
        // console.log(require('util').inspect(res.data, false, null))
        t.deepEqual(res.data,
          { commit:
            { author:
              { name: 'keik',
                email: 'k4t0.kei@gmail.com',
                date: '2016-09-27T11:12:31.000Z' },
              committer:
              { name: 'keik',
                email: 'k4t0.kei@gmail.com',
                date: '2016-09-27T02:42:37.000Z' },
              message: 'Add codes\n',
              parents:
              [ { url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/commits/9e20f2d7bdcc5027cc0a8083f07f32e1a0d1f34d',
                sha: '9e20f2d7bdcc5027cc0a8083f07f32e1a0d1f34d' } ],
              sha: 'f1582566910f7a5d41b47f0c93ed560e1e1fd8d0',
              tree:
              { url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/trees/dde07dc1ebe9119f0abfb6c64c7813e64e9ff723',
                sha: 'dde07dc1ebe9119f0abfb6c64c7813e64e9ff723' },
              url: 'http://localhost:3000/api/v1/repos/user1/repo1/git/commits/f1582566910f7a5d41b47f0c93ed560e1e1fd8d0' },
            html_url: 'http://localhost:3000/user1/repo1/commit/f1582566910f7a5d41b47f0c93ed560e1e1fd8d0',
            parents:
            [ { url: 'http://localhost:3000/api/v1/repos/user1/repo1/commits/9e20f2d7bdcc5027cc0a8083f07f32e1a0d1f34d',
              sha: '9e20f2d7bdcc5027cc0a8083f07f32e1a0d1f34d' } ],
            sha: 'f1582566910f7a5d41b47f0c93ed560e1e1fd8d0',
            url: 'http://localhost:3000/api/v1/repos/user1/repo1/commits/f1582566910f7a5d41b47f0c93ed560e1e1fd8d0',
            files:
            [ { sha: 'deb8561a16afdee514523b1f3ea6bd32d3287fa2',
              filename: 'codes/file.js',
              status: 'added',
              additions: 3,
              deletions: 0,
              changes: 3,
              blob_url: 'http://localhost:3000/user1/repo1/blob/f1582566910f7a5d41b47f0c93ed560e1e1fd8d0/codes/file.js',
              raw_url: 'http://localhost:3000/user1/repo1/raw/f1582566910f7a5d41b47f0c93ed560e1e1fd8d0/codes/file.js',
              contents_url: 'http://localhost:3000/repos/user1/repo1/contents/codes/file.js?ref=f1582566910f7a5d41b47f0c93ed560e1e1fd8d0',
              patch: '@@ -0,0 +1,3 @@\n+function f() {\n+  console.log(\'Hello JavaScript\')\n+}' },
              { sha: '7b5e06f87463a1c164155523151fd3f90b585049',
                filename: 'codes/file.md',
                status: 'added',
                additions: 11,
                deletions: 0,
                changes: 11,
                blob_url: 'http://localhost:3000/user1/repo1/blob/f1582566910f7a5d41b47f0c93ed560e1e1fd8d0/codes/file.md',
                raw_url: 'http://localhost:3000/user1/repo1/raw/f1582566910f7a5d41b47f0c93ed560e1e1fd8d0/codes/file.md',
                contents_url: 'http://localhost:3000/repos/user1/repo1/contents/codes/file.md?ref=f1582566910f7a5d41b47f0c93ed560e1e1fd8d0',
                patch: '@@ -0,0 +1,11 @@\n+# Hello Markdown\n+\n+This is plain text\n+\n+```js\n+console.log(\'This is JavaScript code\')\n+```\n+\n+```ruby\n+puts \'This is Ruby code\'\n+```' },
              { sha: 'b97038f29f6d581aa86d6417f9ed464c1cdfeba2',
                filename: 'codes/file.rb',
                status: 'added',
                additions: 1,
                deletions: 0,
                changes: 1,
                blob_url: 'http://localhost:3000/user1/repo1/blob/f1582566910f7a5d41b47f0c93ed560e1e1fd8d0/codes/file.rb',
                raw_url: 'http://localhost:3000/user1/repo1/raw/f1582566910f7a5d41b47f0c93ed560e1e1fd8d0/codes/file.rb',
                contents_url: 'http://localhost:3000/repos/user1/repo1/contents/codes/file.rb?ref=f1582566910f7a5d41b47f0c93ed560e1e1fd8d0',
                patch: '@@ -0,0 +1 @@\n+puts \'Hello Ruby\'' } ],
            stats: { total: 15, additions: 15, deletions: 0 } }
        )
      })
      .catch((err) => {
        t.fail(err.toString())
      }).finally(t.end)
  })
}
