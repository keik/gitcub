import React from 'react'
import { storiesOf, action, linkTo } from '@kadira/storybook'

import Header from '../components/header'
/* import Repository from '../components/repository/index' */
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

[
  [
    Header, [
      ['with dummy props', {user: 'DUMMY_USER'}]
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
      ['with dummy props', {user: 'DUMMY_USER'}]
    ]
  ],
  [
    RepositoryContentsCode, [
      ['with dummy props', {user: 'DUMMY_USER'}]
    ]
  ],
  [
    RepositoryContentsCommits, [
      ['with dummy props', {user: 'DUMMY_USER'}]
    ]
  ],
  [
    RepositoryContentsEntries, [
      ['with dummy props', {user: 'DUMMY_USER'}]
    ]
  ],
  [
    RepositoryContentsFileContent, [
      ['with dummy props', {user: 'DUMMY_USER'}]
    ]
  ],
  [
    RepositoryContentsGraphs, [
      ['with dummy props', {user: 'DUMMY_USER'}]
    ]
  ],
  [
    RepositoryContentsLabels, [
      ['with dummy props', {user: 'DUMMY_USER'}]
    ]
  ],
  [
    RepositoryContentsMilestones, [
      ['with dummy props', {user: 'DUMMY_USER'}]
    ]
  ],
  [
    RepositoryContentsProjects, [
      ['with dummy props', {user: 'DUMMY_USER'}]
    ]
  ],
  [
    RepositoryContentsPullRequests, [
      ['with dummy props', {user: 'DUMMY_USER'}]
    ]
  ],
  [
    RepositoryContentsPulse, [
      ['with dummy props', {user: 'DUMMY_USER'}]
    ]
  ],
  [
    RepositoryContentsSettings, [
      ['with dummy props', {user: 'DUMMY_USER'}]
    ]
  ],
  [
    RepositoryContentsWiki, [
      ['with dummy props', {user: 'DUMMY_USER'}]
    ]
  ]
].forEach((c) => {
  const [clazz, variations] = c
  const story = storiesOf(clazz.name, module)
  variations.forEach(([label, props]) => {
    story.add(label, () => React.createElement(clazz, {...props}))
  })
})
