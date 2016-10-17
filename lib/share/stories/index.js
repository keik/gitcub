import React from 'react'
import { storiesOf } from '@kadira/storybook'

import Modal from '../components/common/modal'
import Header from '../components/header'
import Repository from '../components/repository/index'
import RepositoryHeader from '../components/repository/header'
import RepositoryNavigations from '../components/repository/navigations'
import RepositoryContentsBranches from '../components/repository/contents/branches'
import RepositoryContentsCode from '../components/repository/contents/code'
import RepositoryContentsCommits from '../components/repository/contents/commits'
import RepositoryContentsEntries from '../components/repository/contents/entries'
import RepositoryContentsFileContent from '../components/repository/contents/file-content'
import RepositoryContentsGraphs from '../components/repository/contents/graphs'
import RepositoryContentsLabels from '../components/repository/contents/labels'
import RepositoryContentsMilestones from '../components/repository/contents/milestones'
import RepositoryContentsProjects from '../components/repository/contents/projects'
import RepositoryContentsPullRequests from '../components/repository/contents/pull-requests'
import RepositoryContentsPulse from '../components/repository/contents/pulse'
import RepositoryContentsSettings from '../components/repository/contents/settings'
import RepositoryContentsWiki from '../components/repository/contents/wiki'

import '../styles/global.css'
import 'font-awesome/css/font-awesome.css'

[
  [
    Modal, [
      ['with dummy props', {user: 'USER'}]
    ]
  ],
  [
    Header, [
      ['with dummy props', {user: 'USER'}]
    ]
  ],
  [
    Repository, [
      ['with dummy props', {user: 'USER'}]
    ]
  ],
  [
    RepositoryHeader, [
      ['with dummy props', {user: 'USER', repo: 'REPO', watchedCount: 1, staredCount: 2, forkedCount: 3}]
    ]
  ],
  [
    RepositoryNavigations, [
      ['with dummy props', {user: 'USER', repo: 'REPO', issuesCount: 1, pullRequestsCount: 2, projectsCount: 3}]
    ]
  ],
  [
    RepositoryContentsBranches, [
      ['with dummy props', {user: 'USER'}]
    ]
  ],
  [
    RepositoryContentsCode, [
      ['with dummy props', {user: 'USER'}]
    ]
  ],
  [
    RepositoryContentsCommits, [
      ['with dummy props', {user: 'USER'}]
    ]
  ],
  [
    RepositoryContentsEntries, [
      ['with dummy props', {
        branches: ['BRANCH_1', 'BRANCH_2'],
        entries: [{id: '1', path: 'FILE_1', commit: '8412d2f5d42781b181e97922ea7e5159ad142f15', commitMessage: 'COMMIT_MESSAGE_1', updateAt: '2016-10-01'},
                  {id: '2', path: 'FILE_2', commit: 'ad87fd3a5b305c55343c545ac58c275e82a7c840', commitMessage: 'COMMIT_MESSAGE_2', updateAt: '2016-10-02'},
                  {id: '3', path: 'FILE_3', commit: 'a278d85850790f3f696a4ed82a69fa5062033b08', commitMessage: 'COMMIT_MESSAGE_3', updateAt: '2016-10-03'}],
        tags: ['TAG_1', 'TAG_2']
      }]
    ]
  ],
  [
    RepositoryContentsFileContent, [
      ['with dummy props', {user: 'USER'}]
    ]
  ],
  [
    RepositoryContentsGraphs, [
      ['with dummy props', {user: 'USER'}]
    ]
  ],
  [
    RepositoryContentsLabels, [
      ['with dummy props', {user: 'USER'}]
    ]
  ],
  [
    RepositoryContentsMilestones, [
      ['with dummy props', {user: 'USER'}]
    ]
  ],
  [
    RepositoryContentsProjects, [
      ['with dummy props', {user: 'USER'}]
    ]
  ],
  [
    RepositoryContentsPullRequests, [
      ['with dummy props', {user: 'USER'}]
    ]
  ],
  [
    RepositoryContentsPulse, [
      ['with dummy props', {user: 'USER'}]
    ]
  ],
  [
    RepositoryContentsSettings, [
      ['with dummy props', {user: 'USER'}]
    ]
  ],
  [
    RepositoryContentsWiki, [
      ['with dummy props', {user: 'USER'}]
    ]
  ]
].forEach((c) => {
  const [clazz, variations] = c
  const story = storiesOf(clazz.name, module)
  variations.forEach(([label, props]) => {
    story.add(label, () => React.createElement(clazz, {...props}))
  })
})
