// @flow

import assert from 'assert'
import axios from 'axios'

import { API_GIT_BLOBS } from '../../../../../constants/api'

test(`GET ${API_GIT_BLOBS} with no parameter should return 404`, async () => {
  const res = await axios
    .get(`http://localhost:8001/api/v1/repos/user1/repo1/git/blobs`)
    .catch(e => e.response)
  assert(res.status === 404)
})

test(`GET ${API_GIT_BLOBS} with SHA should return file info`, async () => {
  const res = await axios.get(
    `http://localhost:8001/api/v1/repos/user1/repo1/git/blobs/b97038f29f6d581aa86d6417f9ed464c1cdfeba2`
  )
  assert.deepEqual(res.data, {
    bytes: 18,
    content: "puts 'Hello Ruby'\n",
    lines: 1,
    sha: 'b97038f29f6d581aa86d6417f9ed464c1cdfeba2'
  })
})

test(`GET ${API_GIT_BLOBS} with REFERENCE/PATH should return file info`, async () => {
  const res = await axios.get(
    `http://localhost:8001/api/v1/repos/user1/repo1/git/blobs/master/file1`
  )
  assert.deepEqual(res.data, {
    bytes: 6,
    content: 'hello\n',
    lines: 1,
    sha: 'ce013625030ba8dba906f756967f9e9ca394464a'
  })
})

test(`GET ${API_GIT_BLOBS} with REFERENCE/NESTED_PATH should return file info`, async () => {
  const res = await axios.get(
    `http://localhost:8001/api/v1/repos/user1/repo1/git/blobs/master/d/dd/nested`
  )
  assert.deepEqual(res.data, {
    bytes: 8,
    content: 'in deep\n',
    lines: 1,
    sha: '319b14e6a0dfee9ed07d56a90d40ff852ec63672'
  })
})

test(`GET ${API_GIT_BLOBS} with SHA/PATH should return file info`, async () => {
  const res = await axios.get(
    `http://localhost:8001/api/v1/repos/user1/repo1/git/blobs/f1582566910f7a5d41b47f0c93ed560e1e1fd8d0/file1`
  )
  assert.deepEqual(res.data, {
    bytes: 6,
    content: 'hello\n',
    lines: 1,
    sha: 'ce013625030ba8dba906f756967f9e9ca394464a'
  })
})

test(`GET ${API_GIT_BLOBS} from no exists repo should return 404`, async () => {
  const res = await axios
    .get(
      `http://localhost:8001/api/v1/repos/no_exists_user/foo/git/blobs/b97038f29f6d581aa86d6417f9ed464c1cdfeba2`
    )
    .catch(e => e.response)

  assert(res.status === 404)
})
