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

  const parsed0 = utils.parseEntriesByDirLevel(entries, 0)
  const parsed1 = utils.parseEntriesByDirLevel(entries, 1)
  const parsed2 = utils.parseEntriesByDirLevel(entries, 2)
  const parsed3 = utils.parseEntriesByDirLevel(entries, 3)
  t.deepEqual(parsed0, { file1: { lastCommit: { message: 'Add file1\n', date: '2016-09-24T05:48:16.000Z' }, isFile: true },
                         file2: { lastCommit: { message: 'Add `!` to file2\n', date: '2016-09-27T01:08:48.000Z' }, isFile: true },
                         file3: { lastCommit: { message: 'Add file3\n', date: '2016-09-27T01:08:08.000Z' }, isFile: true },
                         codes: { lastCommit: { message: 'Add codes3\n', date: '2016-09-27T02:43:37.000Z' }, isFile: false },
                         d: { lastCommit: { message: 'Add d/file3\n', date: '2016-09-25T04:15:47.000Z' }, isFile: false } })
  t.deepEqual(parsed1, { 'file.js': { lastCommit: { message: 'Add codes1\n', date: '2016-09-27T02:41:37.000Z' }, isFile: true },
                         d: { lastCommit: { message: 'Add codes3\n', date: '2016-09-27T02:43:37.000Z' }, isFile: false },
                         'file.rb': { lastCommit: { message: 'Add codes3\n', date: '2016-09-27T02:42:37.000Z' }, isFile: true },
                         file3: { lastCommit: { message: 'Add d/file3\n', date: '2016-09-25T04:15:47.000Z' }, isFile: true } })

  t.deepEqual(parsed2, { 'file.md': { lastCommit: { message: 'Add codes3\n', date: '2016-09-27T02:43:37.000Z' }, isFile: true } })
  t.deepEqual(parsed3, {})
})
