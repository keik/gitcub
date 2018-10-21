// @flow

import test from 'tape'
import { shallow } from 'enzyme'
import React from 'react'

import RepoNavigations from './Navigations'
import styles from './Navigations.css'

test('<RepoNavigations /> should render active menu according to current route without session', t => {
  const props = {
    issuesCount: -1,
    params: { owner: 'foo', repo: 'bar' },
    pullRequestsCount: -1,
    projectsCount: -1,
    session: null
  }

  t.is(
    shallow(<RepoNavigations {...props} routes={[{ path: '' }]} />).find('Link')
      .length,
    6
  )

  t.deepEqual(
    shallow(<RepoNavigations {...props} routes={[{ path: '' }]} />)
      .find('Link')
      .map(el => el.props().to),
    [
      '/foo/bar',
      '/foo/bar/issues',
      '/foo/bar/pulls',
      '/foo/bar/projects',
      '/foo/bar/pulse',
      '/foo/bar/graphs'
    ]
  )

  t.is(
    shallow(<RepoNavigations {...props} routes={[{ path: '' }]} />)
      .find(`.${styles.selected} > Link`)
      .props().to,
    '/foo/bar'
  )
  t.is(
    shallow(<RepoNavigations {...props} routes={[{ path: 'branches' }]} />)
      .find(`.${styles.selected} > Link`)
      .props().to,
    '/foo/bar'
  )
  t.is(
    shallow(<RepoNavigations {...props} routes={[{ path: 'blob' }]} />)
      .find(`.${styles.selected} > Link`)
      .props().to,
    '/foo/bar'
  )
  t.is(
    shallow(<RepoNavigations {...props} routes={[{ path: 'commit' }]} />)
      .find(`.${styles.selected} > Link`)
      .props().to,
    '/foo/bar'
  )
  t.is(
    shallow(<RepoNavigations {...props} routes={[{ path: 'tree' }]} />)
      .find(`.${styles.selected} > Link`)
      .props().to,
    '/foo/bar'
  )

  t.is(
    shallow(<RepoNavigations {...props} routes={[{ path: 'issues' }]} />)
      .find(`.${styles.selected} > Link`)
      .props().to,
    '/foo/bar/issues'
  )

  t.is(
    shallow(<RepoNavigations {...props} routes={[{ path: 'pulls' }]} />)
      .find(`.${styles.selected} > Link`)
      .props().to,
    '/foo/bar/pulls'
  )

  t.is(
    shallow(<RepoNavigations {...props} routes={[{ path: 'projects' }]} />)
      .find(`.${styles.selected} > Link`)
      .props().to,
    '/foo/bar/projects'
  )

  t.is(
    shallow(<RepoNavigations {...props} routes={[{ path: 'pulse' }]} />)
      .find(`.${styles.selected} > Link`)
      .props().to,
    '/foo/bar/pulse'
  )

  t.is(
    shallow(<RepoNavigations {...props} routes={[{ path: 'graphs' }]} />)
      .find(`.${styles.selected} > Link`)
      .props().to,
    '/foo/bar/graphs'
  )

  t.end()
})

test('<RepoNavigations /> should render active menu according to current route with session', t => {
  const props = {
    issuesCount: -1,
    params: { owner: 'foo', repo: 'bar' },
    pullRequestsCount: -1,
    projectsCount: -1,
    session: {}
  }

  t.is(
    shallow(<RepoNavigations {...props} routes={[{ path: '' }]} />).find('Link')
      .length,
    8
  )

  t.deepEqual(
    shallow(<RepoNavigations {...props} routes={[{ path: '' }]} />)
      .find('Link')
      .map(el => el.props().to),
    [
      '/foo/bar',
      '/foo/bar/issues',
      '/foo/bar/pulls',
      '/foo/bar/projects',
      '/foo/bar/wiki',
      '/foo/bar/pulse',
      '/foo/bar/graphs',
      '/foo/bar/settings'
    ]
  )

  t.is(
    shallow(<RepoNavigations {...props} routes={[{ path: '' }]} />)
      .find(`.${styles.selected} > Link`)
      .props().to,
    '/foo/bar'
  )
  t.is(
    shallow(<RepoNavigations {...props} routes={[{ path: 'branches' }]} />)
      .find(`.${styles.selected} > Link`)
      .props().to,
    '/foo/bar'
  )
  t.is(
    shallow(<RepoNavigations {...props} routes={[{ path: 'blob' }]} />)
      .find(`.${styles.selected} > Link`)
      .props().to,
    '/foo/bar'
  )
  t.is(
    shallow(<RepoNavigations {...props} routes={[{ path: 'commit' }]} />)
      .find(`.${styles.selected} > Link`)
      .props().to,
    '/foo/bar'
  )
  t.is(
    shallow(<RepoNavigations {...props} routes={[{ path: 'tree' }]} />)
      .find(`.${styles.selected} > Link`)
      .props().to,
    '/foo/bar'
  )

  t.is(
    shallow(<RepoNavigations {...props} routes={[{ path: 'issues' }]} />)
      .find(`.${styles.selected} > Link`)
      .props().to,
    '/foo/bar/issues'
  )

  t.is(
    shallow(<RepoNavigations {...props} routes={[{ path: 'pulls' }]} />)
      .find(`.${styles.selected} > Link`)
      .props().to,
    '/foo/bar/pulls'
  )

  t.is(
    shallow(<RepoNavigations {...props} routes={[{ path: 'projects' }]} />)
      .find(`.${styles.selected} > Link`)
      .props().to,
    '/foo/bar/projects'
  )

  t.is(
    shallow(<RepoNavigations {...props} routes={[{ path: 'wiki' }]} />)
      .find(`.${styles.selected} > Link`)
      .props().to,
    '/foo/bar/wiki'
  )

  t.is(
    shallow(<RepoNavigations {...props} routes={[{ path: 'pulse' }]} />)
      .find(`.${styles.selected} > Link`)
      .props().to,
    '/foo/bar/pulse'
  )

  t.is(
    shallow(<RepoNavigations {...props} routes={[{ path: 'graphs' }]} />)
      .find(`.${styles.selected} > Link`)
      .props().to,
    '/foo/bar/graphs'
  )

  t.is(
    shallow(<RepoNavigations {...props} routes={[{ path: 'settings' }]} />)
      .find(`.${styles.selected} > Link`)
      .props().to,
    '/foo/bar/settings'
  )
  t.end()
})
