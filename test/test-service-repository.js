import test from 'ava'

import * as RepositoryService from '../lib/server/service/repository'

const config = {
  PORT: 3001,
  REPO_ROOT: './fixture/repos',
}

test.cb('RepositoryService.getBranches return promise with result of array of branches name', (t) => {
  t.is(true, true)
  RepositoryService.getBranches(config, 'dummy', 'repo1')
   .then((branches) => {
     t.deepEqual(branches, ['feature', 'master'])
     t.end()
   })
})

test.cb('RepositoryService.getTags return promise with result of array of tags name', (t) => {
  t.is(true, true)
  RepositoryService.getTags(config, 'dummy', 'repo1')
   .then((tags) => {
     t.deepEqual(tags, ['v1.0.0'])
     t.end()
   })
})

test.cb('RepositoryService.getCommits return promise with result of array of commits', (t) => {
  t.is(true, true)
  RepositoryService.getCommits(config, 'dummy', 'repo1', 'master')
   .then((commits) => {
     t.deepEqual(commits.map(c => c.message),  ['Add codes\n',
                                                'Merge branch \'feature\'\n',
                                                'Add `!` to file2\n',
                                                'Add file3\n',
                                                'Add d/file3\n',
                                                'Add file2\n',
                                                'Add file1\n'])
     t.deepEqual(Object.keys(commits[0]).sort(), ['id', 'date', 'body', 'message'].sort())
     t.end()
   })
})
