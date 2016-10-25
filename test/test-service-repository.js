import test from 'ava'
import promiseFinally from 'promise.prototype.finally'

import * as RepositoryService from '../lib/server/service/repository'

promiseFinally.shim()

const config = {
  PORT: 3001,
  REPO_ROOT: './fixture/repos',
}
test('dummy', t => {})
/*
 * test.cb('RepositoryService.getBranches return promise with result of array of branches name', (t) => {
 *   RepositoryService.getBranches(config, 'user1', 'repo1')
 *     .then((branches) => {
 *       t.deepEqual(branches.sort(), ['feature', 'master'].sort())
 *     })
 *     .catch((err) => {
 *       t.fail(err.toString())
 *     }).finally(t.end)
 * })
 *
 * test.cb('RepositoryService.getTags return promise with result of array of tags name', (t) => {
 *   RepositoryService.getTags(config, 'user1', 'repo1')
 *     .then((tags) => {
 *       t.deepEqual(tags, ['v1.0.0'])
 *     })
 *     .catch((err) => {
 *       t.fail(err.toString())
 *     }).finally(t.end)
 * })
 *
 * test.cb('RepositoryService.getCommits return promise with result of array of commits', (t) => {
 *   RepositoryService.getCommits(config, 'user1', 'repo1', 'master')
 *     .then((commits) => {
 *       t.deepEqual(commits.map(c => c.message),
 *                   ["Add nested file\n","Add codes\n","Merge branch 'feature'\n","Add `!` to file2\n","Add file3\n","Add d/file3\n","Add file2\n","Add file1\n"]
 *       )
 *       t.deepEqual(Object.keys(commits[0]).sort(), ['id', 'date', 'body', 'message'].sort())
 *     })
 *     .catch((err) => {
 *       t.fail(err.toString())
 *     }).finally(t.end)
 * })
 *
 * test.cb('RepositoryService.getEntries return promise with result of file contnet', (t) => {
 *   RepositoryService.getEntries(config, 'user1', 'repo1', 'master', 'file')
 *     .then((entries) => {
 *       t.deepEqual(Object.keys(entries).sort(),
 *                   ["codes/file.js","codes/file.md","codes/file.rb","d/dd/nested","d/file3","file1","file2","file3"]
 *                     .sort())
 *     })
 *     .catch((err) => {
 *       t.fail(err.toString())
 *     }).finally(t.end)
 * })
 *
 * test.cb('RepositoryService.getContent return promise with result of file contnet', (t) => {
 *   RepositoryService.getContent(config, 'user1', 'repo1', 'master', 'file1')
 *     .then((content) => {
 *       t.deepEqual(content, 'hello\n')
 *     })
 *     .catch(err => {
 *       t.fail(err.toString())
 *     }).finally(t.end)
 * })*/
