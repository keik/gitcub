// @flow

import test from 'tape'
import axios from 'axios'
import Express from 'express'

import { API_REPOS_CONTENTS } from '../../../../../constants/api'
import contentsRouter from './contents'

let app
let PORT
test.test('setup', t => {
  app = Express()
    .use(contentsRouter)
    .listen(0)
  // $FlowFixMe
  PORT = app.address().port
  t.end()
})

test(`GET ${API_REPOS_CONTENTS} with no params should return files in root directory`, t => {
  axios
    .get(`http://localhost:${PORT}/api/v1/repos/user1/repo1/contents`)
    .then(res => {
      t.deepEqual(res.data, [
        {
          name: 'codes',
          path: 'codes',
          sha: '18cf5ec48ba05a65b08edf9e632fd1e36d790ac3',
          size: 0,
          type: 'dir',
          url: '/api/v1/repos/user1/repo1/contents/codes'
        },
        {
          name: 'd',
          path: 'd',
          sha: 'b53b63129037d82af19faca7a465a0d8a87d76db',
          size: 0,
          type: 'dir',
          url: '/api/v1/repos/user1/repo1/contents/d'
        },
        {
          name: 'file1',
          path: 'file1',
          sha: 'ce013625030ba8dba906f756967f9e9ca394464a',
          size: 0,
          type: 'file',
          url: '/api/v1/repos/user1/repo1/contents/file1'
        },
        {
          name: 'file2',
          path: 'file2',
          sha: '18df7980ddf987c2e3e20eb8007727c659b37216',
          size: 0,
          type: 'file',
          url: '/api/v1/repos/user1/repo1/contents/file2'
        },
        {
          name: 'file3',
          path: 'file3',
          sha: '57651f675c8e781cf377630612076c16b83fe780',
          size: 0,
          type: 'file',
          url: '/api/v1/repos/user1/repo1/contents/file3'
        }
      ])
    })
    .catch(err => {
      console.log(err)
      t.fail(err.toString())
    })
    .then(t.end)
})

test(`GET ${API_REPOS_CONTENTS} with ROOT_PATH should return files in root directory`, t => {
  axios
    .get(`http://localhost:${PORT}/api/v1/repos/user1/repo1/contents/`)
    .then(res => {
      t.deepEqual(res.data, [
        {
          name: 'codes',
          path: 'codes',
          sha: '18cf5ec48ba05a65b08edf9e632fd1e36d790ac3',
          size: 0,
          type: 'dir',
          url: '/api/v1/repos/user1/repo1/contents/codes'
        },
        {
          name: 'd',
          path: 'd',
          sha: 'b53b63129037d82af19faca7a465a0d8a87d76db',
          size: 0,
          type: 'dir',
          url: '/api/v1/repos/user1/repo1/contents/d'
        },
        {
          name: 'file1',
          path: 'file1',
          sha: 'ce013625030ba8dba906f756967f9e9ca394464a',
          size: 0,
          type: 'file',
          url: '/api/v1/repos/user1/repo1/contents/file1'
        },
        {
          name: 'file2',
          path: 'file2',
          sha: '18df7980ddf987c2e3e20eb8007727c659b37216',
          size: 0,
          type: 'file',
          url: '/api/v1/repos/user1/repo1/contents/file2'
        },
        {
          name: 'file3',
          path: 'file3',
          sha: '57651f675c8e781cf377630612076c16b83fe780',
          size: 0,
          type: 'file',
          url: '/api/v1/repos/user1/repo1/contents/file3'
        }
      ])
    })
    .catch(err => {
      t.fail(err.toString())
    })
    .then(t.end)
})

test(`GET ${API_REPOS_CONTENTS} with DIR_PATH should return files in specified directory`, t => {
  axios
    .get(`http://localhost:${PORT}/api/v1/repos/user1/repo1/contents/d`)
    .then(res => {
      t.deepEqual(res.data, [
        {
          name: 'dd',
          path: 'd/dd',
          sha: '6fb01362ccb8681e04c377695f2d1f43aecabe91',
          size: 0,
          type: 'dir',
          url: '/api/v1/repos/user1/repo1/contents/d/dd'
        },
        {
          name: 'file3',
          path: 'd/file3',
          sha: 'd2cebd4f0a9e97a48a6139d09cafdb513ad8fee3',
          size: 0,
          type: 'file',
          url: '/api/v1/repos/user1/repo1/contents/d/file3'
        }
      ])
    })
    .catch(err => {
      console.error(err)
      t.fail(err.toString())
    })
    .then(t.end)
})

test(`GET ${API_REPOS_CONTENTS} with FILE_PATH directory should return file content`, t => {
  axios
    .get(`http://localhost:${PORT}/api/v1/repos/user1/repo1/contents/file1`)
    .then(res => {
      t.deepEqual(res.data, {
        content: 'hello\n',
        name: 'file1',
        path: 'file1',
        sha: 'ce013625030ba8dba906f756967f9e9ca394464a',
        size: 6,
        type: 'file',
        url: '/api/v1/repos/user1/repo1/contents/file1'
      })
    })
    .catch(err => {
      console.error(err)
      t.fail(err.toString())
    })
    .then(t.end)
})

test(`GET ${API_REPOS_CONTENTS} with DIR_PATH/FILE_PATH should return file contents`, t => {
  axios
    .get(`http://localhost:${PORT}/api/v1/repos/user1/repo1/contents/d/file3`)
    .then(res => {
      t.deepEqual(res.data, {
        content: 'in dir\n',
        name: 'file3',
        path: 'd/file3',
        sha: 'd2cebd4f0a9e97a48a6139d09cafdb513ad8fee3',
        size: 7,
        type: 'file',
        url: '/api/v1/repos/user1/repo1/contents/d/file3'
      })
    })
    .catch(err => {
      console.error(err)
      t.fail(err.toString())
    })
    .then(t.end)
})

test(`GET ${API_REPOS_CONTENTS} with DIR_PATH?ref=REF should return files in specified directory`, t => {
  axios
    .get(
      `http://localhost:${PORT}/api/v1/repos/user1/repo1/contents/d?ref=feature`
    )
    .then(res => {
      t.deepEqual(res.data, [
        {
          name: 'file3',
          path: 'd/file3',
          sha: 'd2cebd4f0a9e97a48a6139d09cafdb513ad8fee3',
          size: 0,
          type: 'file',
          url: '/api/v1/repos/user1/repo1/contents/d/file3?ref=feature'
        }
      ])
    })
    .catch(err => {
      console.error(err)
      t.fail(err.toString())
    })
    .then(t.end)
})

test(`GET ${API_REPOS_CONTENTS} with DIR_PATH?ref=SHA should return files in specified directory`, t => {
  axios
    .get(
      `http://localhost:${PORT}/api/v1/repos/user1/repo1/contents/d?ref=0100c14d9341db683c43e47c6944ecb1616005bd`
    )
    .then(res => {
      t.deepEqual(res.data, [
        {
          name: 'dd',
          path: 'd/dd',
          sha: '6fb01362ccb8681e04c377695f2d1f43aecabe91',
          size: 0,
          type: 'dir',
          url:
            '/api/v1/repos/user1/repo1/contents/d/dd?ref=0100c14d9341db683c43e47c6944ecb1616005bd'
        },
        {
          name: 'file3',
          path: 'd/file3',
          sha: 'd2cebd4f0a9e97a48a6139d09cafdb513ad8fee3',
          size: 0,
          type: 'file',
          url:
            '/api/v1/repos/user1/repo1/contents/d/file3?ref=0100c14d9341db683c43e47c6944ecb1616005bd'
        }
      ])
    })
    .catch(err => {
      console.error(err)
      t.fail(err.toString())
    })
    .then(t.end)
})

test(`GET ${API_REPOS_CONTENTS} with FILE_PATH?ref=REF should return file contents`, t => {
  axios
    .get(
      `http://localhost:${PORT}/api/v1/repos/user1/repo1/contents/file2?ref=feature`
    )
    .then(res => {
      t.deepEqual(res.data, {
        content: 'world!\n',
        name: 'file2',
        path: 'file2',
        sha: '18df7980ddf987c2e3e20eb8007727c659b37216',
        size: 7,
        type: 'file',
        url: '/api/v1/repos/user1/repo1/contents/file2?ref=feature'
      })
    })
    .catch(err => {
      console.error(err)
      t.fail(err.toString())
    })
    .then(t.end)
})

test(`GET ${API_REPOS_CONTENTS} with FILE_PATH?ref=SHA should return file contents`, t => {
  axios
    .get(
      `http://localhost:${PORT}/api/v1/repos/user1/repo1/contents/file2?ref=297862f2168af863ae0e2735caabe8b7461f188f`
    )
    .then(res => {
      t.deepEqual(res.data, {
        content: 'world\n',
        name: 'file2',
        path: 'file2',
        sha: 'cc628ccd10742baea8241c5924df992b5c019f71',
        size: 6,
        type: 'file',
        url:
          '/api/v1/repos/user1/repo1/contents/file2?ref=297862f2168af863ae0e2735caabe8b7461f188f'
      })
    })
    .catch(err => {
      console.error(err)
      t.fail(err.toString())
    })
    .then(t.end)
})

test(`GET ${API_REPOS_CONTENTS} from no exists repo should return 404`, t => {
  axios
    .get(`http://localhost:${PORT}/api/v1/repos/no_exists_user/foo/contents`)
    .then(() => {
      t.fail()
    })
    .catch(() => {
      // TODO 404 with global error handler
      t.ok(true)
    })
    .then(t.end)
})

test.test('teardown', t => {
  if (app) app.close()
  t.end()
})
