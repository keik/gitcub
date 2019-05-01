// @flow

import assert from 'assert'
import axios from 'axios'

import { API_GIT_TAGS } from '../../../../../constants/api'

test(`GET ${API_GIT_TAGS} with SHA should return a specified commit`, async () => {
  const res = await axios
    .get(`http://localhost:8001/api/v1/repos/user1/repo1/git/tags/aaaaa`)
    .catch(e => e.response)
  assert(res.data === 'Not Implemented')
})

test(`GET ${API_GIT_TAGS} from no exists repo should return 404`, async () => {
  const res = await axios
    .get(`http://localhost:8001/api/v1/repos/no_exists_user/foo/git/tags/aaaaa`)
    .catch(e => e.response)
  assert(res.data === 'Not Implemented')
})
