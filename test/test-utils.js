import test from 'ava'

import * as utils from '../lib/share/utils'

test('parse entries by directories', (t) => {
  const entries = [
    {
      "path":"file1",
      "type":"blob",
      "sha":"ce013625030ba8dba906f756967f9e9ca394464a",
      "lastCommit":{
        "message":"Add file1\n",
        "date":"2016-09-24T05:48:16.000Z"
      }
    },
    {
      "path":"file2",
      "type":"blob",
      "sha":"18df7980ddf987c2e3e20eb8007727c659b37216",
      "lastCommit":{
        "message":"Add `!` to file2\n",
        "date":"2016-09-27T01:08:48.000Z"
      }
    },
    {
      "path":"file3",
      "type":"blob",
      "sha":"57651f675c8e781cf377630612076c16b83fe780",
      "lastCommit":{
        "message":"Add file3\n",
        "date":"2016-09-27T01:08:08.000Z"
      }
    },
    {
      "path":"codes/file.js",
      "type":"blob",
      "sha":"deb8561a16afdee514523b1f3ea6bd32d3287fa2",
      "lastCommit":{
        "message":"Add codes\n",
        "date":"2016-09-27T02:42:37.000Z"
      }
    },
    {
      "path":"codes/file.md",
      "type":"blob",
      "sha":"7b5e06f87463a1c164155523151fd3f90b585049",
      "lastCommit":{
        "message":"Add codes\n",
        "date":"2016-09-27T02:42:37.000Z"
      }
    },
    {
      "path":"codes/file.rb",
      "type":"blob",
      "sha":"b97038f29f6d581aa86d6417f9ed464c1cdfeba2",
      "lastCommit":{
        "message":"Add codes\n",
        "date":"2016-09-27T02:42:37.000Z"
      }
    },
    {
      "path":"d/file3",
      "type":"blob",
      "sha":"d2cebd4f0a9e97a48a6139d09cafdb513ad8fee3",
      "lastCommit":{
        "message":"Add d/file3\n",
        "date":"2016-09-25T04:15:47.000Z"
      }
    },
    {
      "path":"d/dd/nested",
      "type":"blob",
      "sha":"319b14e6a0dfee9ed07d56a90d40ff852ec63672",
      "lastCommit":{
        "message":"Add nested file\n",
        "date":"2016-10-24T14:13:53.000Z"
      }
    }
  ]

  const parsed_ = utils.parseEntriesByDirLevel(entries, '')
  t.deepEqual(parsed_,
              [ { path: 'file1',
                  type: 'blob',
                  sha: 'ce013625030ba8dba906f756967f9e9ca394464a',
                  lastCommit: { message: 'Add file1\n', date: '2016-09-24T05:48:16.000Z' } },
                { path: 'file2',
                  type: 'blob',
                  sha: '18df7980ddf987c2e3e20eb8007727c659b37216',
                  lastCommit:
                             { message: 'Add `!` to file2\n',
                               date: '2016-09-27T01:08:48.000Z' } },
                { path: 'file3',
                  type: 'blob',
                  sha: '57651f675c8e781cf377630612076c16b83fe780',
                  lastCommit: { message: 'Add file3\n', date: '2016-09-27T01:08:08.000Z' } },
                { path: 'codes',
                  type: 'tree',
                  sha: 'deb8561a16afdee514523b1f3ea6bd32d3287fa2',
                  lastCommit: { message: 'Add codes\n', date: '2016-09-27T02:42:37.000Z' } },
                { path: 'd',
                  type: 'tree',
                  sha: 'd2cebd4f0a9e97a48a6139d09cafdb513ad8fee3',
                  lastCommit: { message: 'Add d/file3\n', date: '2016-09-25T04:15:47.000Z' } } ]
  )
  const parsed_codes = utils.parseEntriesByDirLevel(entries, 'codes')
  t.deepEqual(parsed_codes,
              [ { path: 'file.js',
                  type: 'blob',
                  sha: 'deb8561a16afdee514523b1f3ea6bd32d3287fa2',
                  lastCommit: { message: 'Add codes\n', date: '2016-09-27T02:42:37.000Z' } },
                { path: 'file.md',
                  type: 'blob',
                  sha: '7b5e06f87463a1c164155523151fd3f90b585049',
                  lastCommit: { message: 'Add codes\n', date: '2016-09-27T02:42:37.000Z' } },
                { path: 'file.rb',
                  type: 'blob',
                  sha: 'b97038f29f6d581aa86d6417f9ed464c1cdfeba2',
                  lastCommit: { message: 'Add codes\n', date: '2016-09-27T02:42:37.000Z' } } ]
  )
  const parsed_d = utils.parseEntriesByDirLevel(entries, 'd')
  t.deepEqual(parsed_d,
              [ { path: 'file3',
                  type: 'blob',
                  sha: 'd2cebd4f0a9e97a48a6139d09cafdb513ad8fee3',
                  lastCommit: { message: 'Add d/file3\n', date: '2016-09-25T04:15:47.000Z' } },
                { path: 'dd',
                  type: 'tree',
                  sha: '319b14e6a0dfee9ed07d56a90d40ff852ec63672',
                  lastCommit:
                             { message: 'Add nested file\n',
                               date: '2016-10-24T14:13:53.000Z' } } ]
  )
  const parsed_d_dd = utils.parseEntriesByDirLevel(entries, 'd/dd')
  t.deepEqual(parsed_d_dd,
              [ { path: 'nested',
                  type: 'blob',
                  sha: '319b14e6a0dfee9ed07d56a90d40ff852ec63672',
                  lastCommit:
                             { message: 'Add nested file\n',
                               date: '2016-10-24T14:13:53.000Z' } } ]
  )
})
