import React from 'react'
import { storiesOf } from '@kadira/storybook'

import Modal from '../components/common/modal'
import { Tab, TabItems, TabItem, TabPanel } from '../components/common/tab'
import Header from '../components/header'
import Footer from '../components/footer'
import Repository from '../components/repository/index'
import RepoHeader from '../components/repository/header'
import RepoNavigations from '../components/repository/navigations'
import RepoBranches from '../components/repository/branches'
import RepoCommits from '../components/repository/commits'
import RepoHome from '../components/repository/home'
import RepoTree from '../components/repository/tree'
import RepoFileContent from '../components/repository/file-content'
import RepoGraphs from '../components/repository/graphs'
import RepoIssues from '../components/repository/issues'
import RepoLabels from '../components/repository/labels'
import RepoMilestones from '../components/repository/milestones'
import RepoProjects from '../components/repository/projects'
import RepoPulse from '../components/repository/pulse'
import RepoSettings from '../components/repository/settings'
import RepoWiki from '../components/repository/wiki'

import '../styles/global.css'
import 'font-awesome/css/font-awesome.css'

[
  [Modal, [
    ['with single child', {
      active: true,
      children: <div>div 1</div>
    }],
    ['with multiple children', {
      active: true,
      children: [<div key="1">div 1</div>, <div key="2">div 2</div>]
    }]
  ]],
  [Tab, [
    ['with single child', {
      children:
        [
          <TabItems>
            <TabItem key="t1" target="t1" active>t1</TabItem>
            <TabItem key="t2" target="t2">t2</TabItem>
            <TabItem key="t3" target="t3">t3</TabItem>
          </TabItems>,
          <TabPanel ref="t1">t1 panel</TabPanel>,
          <TabPanel ref="t2">t2 panel</TabPanel>,
          <TabPanel ref="t3">t3 panel</TabPanel>
        ]
    }]
  ]],
  [Header, [
    ['with dummy props', {
      loginUser: 'USER'
    }]
  ]],
  [Footer, [
    ['with empty props', {}]
  ]],
  [Repository, [
    ['with dummy props', {
      branches: ['BRANCH_1', 'BRANCH_2'],
      entries: [{id: '1', path: 'FILE_1', lastCommit: {id: '8412d2f5d42781b181e97922ea7e5159ad142f15', message: 'COMMIT_MESSAGE_1', date: '2016-10-01'}},
                {id: '2', path: 'FILE_2', lastCommit: {id: 'ad87fd3a5b305c55343c545ac58c275e82a7c840', message: 'COMMIT_MESSAGE_2', date: '2016-10-02'}},
                {id: '3', path: 'FILE_3', lastCommit: {id: 'a278d85850790f3f696a4ed82a69fa5062033b08', message: 'COMMIT_MESSAGE_3', date: '2016-10-03'}}],
      repo: 'REPO',
      tags: ['TAG_1', 'TAG_2'],
      user: 'USER',
    }]
  ]],
  [RepoHeader, [
    ['with dummy props', {
      forkedCount: 3,
      repo: 'REPO',
      staredCount: 2,
      user: 'USER',
      watchedCount: 1,
    }]
  ]],
  [RepoNavigations, [
    ['with dummy props', {
      issuesCount: 1,
      projectsCount: 3,
      pullRequestsCount: 2,
      repo: 'REPO',
      user: 'USER',
    }]
  ]],
  [RepoBranches, [
    ['with dummy props', {
      user: 'USER',
    }]
  ]],
  [RepoCommits, [
    ['with dummy props', {
      user: 'USER',
    }]
  ]],
  [RepoHome, [
    ['with dummy props', {
      branch: 'BRANCH_1',
      branches: ['BRANCH_1', 'BRANCH_2'],
      entries: [{id: '1', path: 'FILE_1', lastCommit: {id: '8412d2f5d42781b181e97922ea7e5159ad142f15', message: 'COMMIT_MESSAGE_1', date: '2016-10-01'}},
        {id: '2', path: 'FILE_2', lastCommit: {id: 'ad87fd3a5b305c55343c545ac58c275e82a7c840', message: 'COMMIT_MESSAGE_2', date: '2016-10-02'}},
        {id: '3', path: 'FILE_3', lastCommit: {id: 'a278d85850790f3f696a4ed82a69fa5062033b08', message: 'COMMIT_MESSAGE_3', date: '2016-10-03'}}],
      repo: 'REPO_1',
      tags: ['TAG_1', 'TAG_2'],
      user: 'USER_1',
    }]
  ]],
  [RepoTree, [
    ['with dummy props', {
      branch: 'BRANCH_1',
      branches: ['BRANCH_1', 'BRANCH_2'],
      entries: [{id: '1', path: 'FILE_1', lastCommit: {id: '8412d2f5d42781b181e97922ea7e5159ad142f15', message: 'COMMIT_MESSAGE_1', date: '2016-10-01'}},
        {id: '2', path: 'FILE_2', lastCommit: {id: 'ad87fd3a5b305c55343c545ac58c275e82a7c840', message: 'COMMIT_MESSAGE_2', date: '2016-10-02'}},
        {id: '3', path: 'FILE_3', lastCommit: {id: 'a278d85850790f3f696a4ed82a69fa5062033b08', message: 'COMMIT_MESSAGE_3', date: '2016-10-03'}}],
      repo: 'REPO_1',
      tags: ['TAG_1', 'TAG_2'],
      user: 'USER_1',
    }]
  ]],
  [RepoFileContent, [
    ['with dummy props', {
      fileInfo: {
        lines: 30,
        bytes: 100,
      },
      content: '<span style="color: blue;">HTML</span>'
    }]
  ]],
  [RepoGraphs, [
    ['with dummy props', {
      user: 'USER',
    }]
  ]],
  [RepoIssues, [
    ['with dummy props', {
      issues: [{
        id: 1,
        title: 'ISSUE_1',
        createdAt: '2016-09-24T05:48:16.000Z',
        createdBy: 'USER_1',
        commentsCount: 0
      }, {
        id: 2,
        title: 'ISSUE_2',
        createdAt: '2016-09-24T15:48:16.000Z',
        createdBy: 'USER_2',
        commentsCount: 2
      }],
      repo: 'REPO_1',
      user: 'USER_1',
    }]
  ]],
  [RepoLabels, [
    ['with dummy props', {
      user: 'USER',
    }]
  ]],
  [RepoMilestones, [
    ['with dummy props', {
      user: 'USER',
    }]
  ]],
  [RepoProjects, [
    ['with dummy props', {
      user: 'USER',
    }]
  ]],
  [RepoPulse, [
    ['with dummy props', {
      user: 'USER',
    }]
  ]],
  [RepoSettings, [
    ['with dummy props', {
      user: 'USER',
    }]
  ]],
  [RepoWiki, [
    ['with dummy props', {
      user: 'USER',
    }]
  ]]
].forEach((c) => {
  const [clazz, variations] = c
  const story = storiesOf(clazz.name, module)
  variations.forEach(([label, props]) => {
    story.add(label, () => React.createElement(clazz, {...props}))
  })
})
