import test from 'ava'

import * as utils from '../lib/share/utils'

test('parse entries by directories', (t) => {
  const entries = {
    "file1": {
      "lastCommit": {
        "message": "Add file1\n",
        "date": "2016-09-24T05:48:16.000Z"
      }
    },
    "file2": {
      "lastCommit": {
        "message": "Add `!` to file2\n",
        "date": "2016-09-27T01:08:48.000Z"
      }
    },
    "file3": {
      "lastCommit": {
        "message": "Add file3\n",
        "date": "2016-09-27T01:08:08.000Z"
      }
    },
    "codes/file.js": {
      "lastCommit": {
        "message": "Add codes1\n",
        "date": "2016-09-27T02:41:37.000Z"
      }
    },
    "codes/d/file.md": {
      "lastCommit": {
        "message": "Add codes3\n",
        "date": "2016-09-27T02:43:37.000Z"
      }
    },
    "codes/file.rb": {
      "lastCommit": {
        "message": "Add codes3\n",
        "date": "2016-09-27T02:42:37.000Z"
      }
    },
    "d/file3": {
      "lastCommit": {
        "message": "Add d/file3\n",
        "date": "2016-09-25T04:15:47.000Z"
      }
    }
  }

  const parsed_ = utils.parseEntriesByDirLevel(entries, '')
  const parsed_codes = utils.parseEntriesByDirLevel(entries, 'codes')
  const parsed_codes_d = utils.parseEntriesByDirLevel(entries, 'codes/d')
  t.deepEqual(parsed_, { file1: { lastCommit: { message: 'Add file1\n', date: '2016-09-24T05:48:16.000Z' }, isFile: true },
                         file2: { lastCommit: { message: 'Add `!` to file2\n', date: '2016-09-27T01:08:48.000Z' }, isFile: true },
                         file3: { lastCommit: { message: 'Add file3\n', date: '2016-09-27T01:08:08.000Z' }, isFile: true },
                         codes: { lastCommit: { message: 'Add codes3\n', date: '2016-09-27T02:43:37.000Z' }, isFile: false },
                         d: { lastCommit: { message: 'Add d/file3\n', date: '2016-09-25T04:15:47.000Z' }, isFile: false } })
  t.deepEqual(parsed_codes, { 'file.js': { lastCommit: { message: 'Add codes1\n', date: '2016-09-27T02:41:37.000Z' }, isFile: true },
                              d: { lastCommit: { message: 'Add codes3\n', date: '2016-09-27T02:43:37.000Z' }, isFile: false },
                              'file.rb': { lastCommit: { message: 'Add codes3\n', date: '2016-09-27T02:42:37.000Z' }, isFile: true }})

  t.deepEqual(parsed_codes_d, { 'file.md': { lastCommit: { message: 'Add codes3\n', date: '2016-09-27T02:43:37.000Z' }, isFile: true } })
})
