import test from 'ava'
import axios from 'axios'

import { API_TAGS } from '../../lib/server/routers/api/v1'

export default function(config) {
  test.cb(`GET ${API_TAGS} with no parameter should return name of entries in default branch`, (t) => {
    axios.get(`http://localhost:${config.PORT}/api/v1/repos/user1/repo1/git/trees`)
      .then(({data: result}) => {
        t.is(result.tree.length, 8)
        t.deepEqual(Object.keys(result.tree[0]), ['path', 'type', 'sha'])
      }).catch((err) => {
        t.fail(err.toString())
      }).finally(t.end)
  })

  test.cb(`GET ${API_TAGS} with SHA should return name of entries`, (t) => {
    axios.get(`http://localhost:${config.PORT}/api/v1/repos/user1/repo1/git/trees/297862f2168af863ae0e2735caabe8b7461f188f`)
      .then(({data: result}) => {
        t.is(result.tree.length, 4)
        t.deepEqual(Object.keys(result.tree[0]), ['path', 'type', 'sha'])
      }).catch((err) => {
        t.fail(err.toString())
      }).finally(t.end)
  })

  test.cb(`GET ${API_TAGS} with REFERENCE should return name of entries`, (t) => {
    axios.get(`http://localhost:${config.PORT}/api/v1/repos/user1/repo1/git/trees/feature`)
      .then(({data: result}) => {
        t.is(result.tree.length, 4)
        t.deepEqual(Object.keys(result.tree[0]), ['path', 'type', 'sha'])
      }).catch((err) => {
        t.fail(err.toString())
      }).finally(t.end)
  })

  test.cb(`GET ${API_TAGS} with REFERENCE?last_commit should return name of entries with last_commit`, (t) => {
    axios.get(`http://localhost:${config.PORT}/api/v1/repos/user1/repo1/git/trees/297862f2168af863ae0e2735caabe8b7461f188f?last_commit=1`)
      .then(({data: result}) => {
        t.is(result.tree.length, 4)
        t.deepEqual(Object.keys(result.tree[0]), ['path', 'type', 'sha', 'lastCommit'])
      }).catch((err) => {
        t.fail(err.toString())
      }).finally(t.end)
  })
}
