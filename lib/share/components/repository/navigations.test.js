import test        from 'tape'
import { shallow } from 'enzyme'
import React       from 'react'

import RepoNavigations from './navigations'
import styles          from './navigations.css'

test('<RepoNavigations /> with no props should throw error', (t) => {
  t.throws(() => {
    shallow(<RepoNavigations />)
  })
  t.end()
})
test('<RepoNavigations /> should render active menu according to current route', (t) => {
  const props = {params: {owner: 'foo', repo: 'bar'}}

  t.is(shallow(
    <RepoNavigations {...props} routes={[{path: ''}]} />
  ).find(`.${styles.selected} > Link`).props().to, '/foo/bar')
  t.is(shallow(
    <RepoNavigations {...props} routes={[{path: 'branches'}]} />
  ).find(`.${styles.selected} > Link`).props().to, '/foo/bar')
  t.is(shallow(
    <RepoNavigations {...props} routes={[{path: 'blob'}]} />
  ).find(`.${styles.selected} > Link`).props().to, '/foo/bar')
  t.is(shallow(
    <RepoNavigations {...props} routes={[{path: 'commit'}]} />
  ).find(`.${styles.selected} > Link`).props().to, '/foo/bar')
  t.is(shallow(
    <RepoNavigations {...props} routes={[{path: 'tree'}]} />
  ).find(`.${styles.selected} > Link`).props().to, '/foo/bar')

  t.is(shallow(
    <RepoNavigations {...props} routes={[{path: 'issues'}]} />
  ).find(`.${styles.selected} > Link`).props().to, '/foo/bar/issues')

  t.is(shallow(
    <RepoNavigations {...props} routes={[{path: 'pulls'}]} />
  ).find(`.${styles.selected} > Link`).props().to, '/foo/bar/pulls')

  t.is(shallow(
    <RepoNavigations {...props} routes={[{path: 'projects'}]} />
  ).find(`.${styles.selected} > Link`).props().to, '/foo/bar/projects')

  t.is(shallow(
    <RepoNavigations {...props} routes={[{path: 'wiki'}]} />
  ).find(`.${styles.selected} > Link`).props().to, '/foo/bar/wiki')

  t.is(shallow(
    <RepoNavigations {...props} routes={[{path: 'pulse'}]} />
  ).find(`.${styles.selected} > Link`).props().to, '/foo/bar/pulse')

  t.is(shallow(
    <RepoNavigations {...props} routes={[{path: 'graphs'}]} />
  ).find(`.${styles.selected} > Link`).props().to, '/foo/bar/graphs')

  t.is(shallow(
    <RepoNavigations {...props} routes={[{path: 'settings'}]} />
  ).find(`.${styles.selected} > Link`).props().to, '/foo/bar/settings')
  t.end()
})
