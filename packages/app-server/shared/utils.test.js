// @flow

import assert from 'assert'

import * as utils from './utils'

const entries = [
  {
    path: 'file1',
    sha: 'ce013625030ba8dba906f756967f9e9ca394464a',
    lastCommit: {
      author: { date: '2016-09-24T05:48:16.000Z' },
      message: 'Add file1\n',
      sha: 'd29e783434a7fadfa5bbf7b361dfc20a83ad8722'
    }
  },
  {
    path: 'file2',
    sha: '18df7980ddf987c2e3e20eb8007727c659b37216',
    lastCommit: {
      author: { date: '2016-09-26T15:08:24.000Z' },
      message: 'Add `!` to file2\n',
      sha: '2394f21336aec34a5a225f1e8b9039593f1d1e27'
    }
  },
  {
    path: 'file3',
    sha: '57651f675c8e781cf377630612076c16b83fe780',
    lastCommit: {
      author: { date: '2016-09-26T15:07:53.000Z' },
      message: 'Add file3\n',
      sha: '297862f2168af863ae0e2735caabe8b7461f188f'
    }
  },
  {
    path: 'codes/file.js',
    sha: 'deb8561a16afdee514523b1f3ea6bd32d3287fa2',
    lastCommit: {
      author: { date: '2016-09-27T11:12:31.000Z' },
      message: 'Add codes\n',
      sha: 'f1582566910f7a5d41b47f0c93ed560e1e1fd8d0'
    }
  },
  {
    path: 'codes/file.md',
    sha: '7b5e06f87463a1c164155523151fd3f90b585049',
    lastCommit: {
      author: { date: '2016-09-27T11:12:31.000Z' },
      message: 'Add codes\n',
      sha: 'f1582566910f7a5d41b47f0c93ed560e1e1fd8d0'
    }
  },
  {
    path: 'codes/file.rb',
    sha: 'b97038f29f6d581aa86d6417f9ed464c1cdfeba2',
    lastCommit: {
      author: { date: '2016-09-27T11:12:31.000Z' },
      message: 'Add codes\n',
      sha: 'f1582566910f7a5d41b47f0c93ed560e1e1fd8d0'
    }
  },
  {
    path: 'd/file3',
    sha: 'd2cebd4f0a9e97a48a6139d09cafdb513ad8fee3',
    lastCommit: {
      author: { date: '2016-09-25T04:15:47.000Z' },
      message: 'Add d/file3\n',
      sha: 'e801527fecc2efb3a2e710a21a226ca0abf9db63'
    }
  },
  {
    path: 'd/dd/nested',
    sha: '319b14e6a0dfee9ed07d56a90d40ff852ec63672',
    lastCommit: {
      author: { date: '2016-10-24T14:13:53.000Z' },
      message: 'Add nested file\n',
      sha: '0100c14d9341db683c43e47c6944ecb1616005bd'
    }
  }
]

test('parse entries by root', () => {
  const parsed_root = utils.parseEntriesByDirLevel((entries: any), '')
  assert.deepEqual(parsed_root, [
    {
      path: 'file1',
      sha: 'ce013625030ba8dba906f756967f9e9ca394464a',
      lastCommit: {
        author: { date: '2016-09-24T05:48:16.000Z' },
        message: 'Add file1\n',
        sha: 'd29e783434a7fadfa5bbf7b361dfc20a83ad8722'
      },
      type: 'blob'
    },
    {
      path: 'file2',
      sha: '18df7980ddf987c2e3e20eb8007727c659b37216',
      lastCommit: {
        author: { date: '2016-09-26T15:08:24.000Z' },
        message: 'Add `!` to file2\n',
        sha: '2394f21336aec34a5a225f1e8b9039593f1d1e27'
      },
      type: 'blob'
    },
    {
      path: 'file3',
      sha: '57651f675c8e781cf377630612076c16b83fe780',
      lastCommit: {
        author: { date: '2016-09-26T15:07:53.000Z' },
        message: 'Add file3\n',
        sha: '297862f2168af863ae0e2735caabe8b7461f188f'
      },
      type: 'blob'
    },
    {
      path: 'codes',
      sha: 'deb8561a16afdee514523b1f3ea6bd32d3287fa2',
      lastCommit: {
        author: { date: '2016-09-27T11:12:31.000Z' },
        message: 'Add codes\n',
        sha: 'f1582566910f7a5d41b47f0c93ed560e1e1fd8d0'
      },
      type: 'tree'
    },
    {
      path: 'd',
      sha: '319b14e6a0dfee9ed07d56a90d40ff852ec63672',
      lastCommit: {
        author: { date: '2016-10-24T14:13:53.000Z' },
        message: 'Add nested file\n',
        sha: '0100c14d9341db683c43e47c6944ecb1616005bd'
      },
      type: 'tree'
    }
  ])
})

test('parse entries by 1-level dir (1)', () => {
  const parsed_codes = utils.parseEntriesByDirLevel((entries: any), 'codes')
  assert.deepEqual(parsed_codes, [
    {
      path: 'file.js',
      sha: 'deb8561a16afdee514523b1f3ea6bd32d3287fa2',
      lastCommit: {
        author: { date: '2016-09-27T11:12:31.000Z' },
        message: 'Add codes\n',
        sha: 'f1582566910f7a5d41b47f0c93ed560e1e1fd8d0'
      },
      type: 'blob'
    },
    {
      path: 'file.md',
      sha: '7b5e06f87463a1c164155523151fd3f90b585049',
      lastCommit: {
        author: { date: '2016-09-27T11:12:31.000Z' },
        message: 'Add codes\n',
        sha: 'f1582566910f7a5d41b47f0c93ed560e1e1fd8d0'
      },
      type: 'blob'
    },
    {
      path: 'file.rb',
      sha: 'b97038f29f6d581aa86d6417f9ed464c1cdfeba2',
      lastCommit: {
        author: { date: '2016-09-27T11:12:31.000Z' },
        message: 'Add codes\n',
        sha: 'f1582566910f7a5d41b47f0c93ed560e1e1fd8d0'
      },
      type: 'blob'
    }
  ])
})

test('parse entries by 1-level dir (2)', () => {
  const parsed_d = utils.parseEntriesByDirLevel((entries: any), 'd')
  assert.deepEqual(parsed_d, [
    {
      path: 'file3',
      sha: 'd2cebd4f0a9e97a48a6139d09cafdb513ad8fee3',
      lastCommit: {
        author: { date: '2016-09-25T04:15:47.000Z' },
        message: 'Add d/file3\n',
        sha: 'e801527fecc2efb3a2e710a21a226ca0abf9db63'
      },
      type: 'blob'
    },
    {
      path: 'dd',
      sha: '319b14e6a0dfee9ed07d56a90d40ff852ec63672',
      lastCommit: {
        author: { date: '2016-10-24T14:13:53.000Z' },
        message: 'Add nested file\n',
        sha: '0100c14d9341db683c43e47c6944ecb1616005bd'
      },
      type: 'tree'
    }
  ])
})

test('parse entries by 2-level dir', () => {
  const parsed_d_dd = utils.parseEntriesByDirLevel((entries: any), 'd/dd')
  assert.deepEqual(parsed_d_dd, [
    {
      path: 'nested',
      sha: '319b14e6a0dfee9ed07d56a90d40ff852ec63672',
      lastCommit: {
        author: { date: '2016-10-24T14:13:53.000Z' },
        message: 'Add nested file\n',
        sha: '0100c14d9341db683c43e47c6944ecb1616005bd'
      },
      type: 'blob'
    }
  ])
})
