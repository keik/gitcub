import test from 'ava'
import axios from 'axios'

import { API_GIT_TREES } from '../../lib/server/routers/api/v1'

export default function(config) {
  test.cb(`GET ${API_GIT_TREES} with no parameter should return name of entries in default branch`, (t) => {
    axios.get(`http://localhost:${config.PORT}/api/v1/repos/user1/repo1/git/trees`)
      .then((res) => {
        res.data.tree.sort((a, b) => a.path > b.path)
        t.deepEqual(res.data,
          { url: '/api/v1/repos/user1/repo1/git/trees',
            sha: 'master',
            tree:
            [ { path: 'codes/file.js',
              type: 'blob',
              sha: 'deb8561a16afdee514523b1f3ea6bd32d3287fa2' },
              { path: 'codes/file.md',
                type: 'blob',
                sha: '7b5e06f87463a1c164155523151fd3f90b585049' },
              { path: 'codes/file.rb',
                type: 'blob',
                sha: 'b97038f29f6d581aa86d6417f9ed464c1cdfeba2' },
              { path: 'd/dd/nested',
                type: 'blob',
                sha: '319b14e6a0dfee9ed07d56a90d40ff852ec63672' },
              { path: 'd/file3',
                type: 'blob',
                sha: 'd2cebd4f0a9e97a48a6139d09cafdb513ad8fee3' },
              { path: 'file1',
                type: 'blob',
                sha: 'ce013625030ba8dba906f756967f9e9ca394464a' },
              { path: 'file2',
                type: 'blob',
                sha: '18df7980ddf987c2e3e20eb8007727c659b37216' },
              { path: 'file3',
                type: 'blob',
                sha: '57651f675c8e781cf377630612076c16b83fe780' } ] }
        )
      }).catch((err) => {
        t.fail(err.toString())
      }).finally(t.end)
  })

  test.cb(`GET ${API_GIT_TREES} with SHA should return name of entries`, (t) => {
    axios.get(`http://localhost:${config.PORT}/api/v1/repos/user1/repo1/git/trees/297862f2168af863ae0e2735caabe8b7461f188f`)
      .then((res) => {
        res.data.tree.sort((a, b) => a.path > b.path)
        t.deepEqual(res.data,
          { url: '/api/v1/repos/user1/repo1/git/trees/297862f2168af863ae0e2735caabe8b7461f188f',
            sha: '297862f2168af863ae0e2735caabe8b7461f188f',
            tree:
            [ { path: 'd/file3',
              type: 'blob',
              sha: 'd2cebd4f0a9e97a48a6139d09cafdb513ad8fee3' },
              { path: 'file1',
                type: 'blob',
                sha: 'ce013625030ba8dba906f756967f9e9ca394464a' },
              { path: 'file2',
                type: 'blob',
                sha: 'cc628ccd10742baea8241c5924df992b5c019f71' },
              { path: 'file3',
                type: 'blob',
                sha: '57651f675c8e781cf377630612076c16b83fe780' } ] }
        )
      }).catch((err) => {
        t.fail(err.toString())
      }).finally(t.end)
  })

  test.cb(`GET ${API_GIT_TREES} with REFERENCE should return name of entries`, (t) => {
    axios.get(`http://localhost:${config.PORT}/api/v1/repos/user1/repo1/git/trees/feature`)
      .then((res) => {
        res.data.tree.sort((a, b) => a.path > b.path)
        t.deepEqual(res.data,
          { url: '/api/v1/repos/user1/repo1/git/trees/feature',
            sha: 'feature',
            tree:
            [ { path: 'd/file3',
              type: 'blob',
              sha: 'd2cebd4f0a9e97a48a6139d09cafdb513ad8fee3' },
              { path: 'file1',
                type: 'blob',
                sha: 'ce013625030ba8dba906f756967f9e9ca394464a' },
              { path: 'file2',
                type: 'blob',
                sha: '18df7980ddf987c2e3e20eb8007727c659b37216' },
              { path: 'file3',
                type: 'blob',
                sha: '57651f675c8e781cf377630612076c16b83fe780' } ] }
        )
      }).catch((err) => {
        t.fail(err.toString())
      }).finally(t.end)
  })

  test.cb(`GET ${API_GIT_TREES} with REFERENCE?last_commit should return name of entries with last_commit`, (t) => {
    axios.get(`http://localhost:${config.PORT}/api/v1/repos/user1/repo1/git/trees/297862f2168af863ae0e2735caabe8b7461f188f?last_commit=1`)
      .then((res) => {
        res.data.tree.sort((a, b) => a.path > b.path)
        t.deepEqual(res.data,
          { url: '/api/v1/repos/user1/repo1/git/trees/297862f2168af863ae0e2735caabe8b7461f188f?last_commit=1',
            sha: '297862f2168af863ae0e2735caabe8b7461f188f',
            tree:
            [ { path: 'd/file3',
              type: 'blob',
              sha: 'd2cebd4f0a9e97a48a6139d09cafdb513ad8fee3',
              lastCommit: { message: 'Add d/file3\n', date: '2016-09-25T04:15:47.000Z' } },
              { path: 'file1',
                type: 'blob',
                sha: 'ce013625030ba8dba906f756967f9e9ca394464a',
                lastCommit: { message: 'Add file1\n', date: '2016-09-24T05:48:16.000Z' } },
              { path: 'file2',
                type: 'blob',
                sha: 'cc628ccd10742baea8241c5924df992b5c019f71',
                lastCommit: { message: 'Add file2\n', date: '2016-09-24T05:48:36.000Z' } },
              { path: 'file3',
                type: 'blob',
                sha: '57651f675c8e781cf377630612076c16b83fe780',
                lastCommit: { message: 'Add file3\n', date: '2016-09-27T01:08:08.000Z' } } ] }
        )
      }).catch((err) => {
        t.fail(err.toString())
      }).finally(t.end)
  })
}
