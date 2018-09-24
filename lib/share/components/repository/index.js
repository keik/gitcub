// @flow

import * as React from 'react'
import { connect } from 'react-redux'

import RepositoryHeader from './Header'
import styles from './Index.css'
import RepositoryNavigations from './Navigations'

function Repository({
  children,
  forkedCount = 1,
  issuesCount = -1,
  params,
  pullRequestsCount = -1,
  projectsCount = -1,
  staredCount = -1,
  watchedCount = -1,
  routes,
  session
}: {
  children: React.Node,
  forkedCount: number,
  issuesCount: number,
  params: {
    owner: string,
    repo: string
  },
  pullRequestsCount: number,
  projectsCount: number,
  staredCount: number,
  watchedCount: number,
  routes: any,
  session: any
}) {
  return (
    <div>
      <div className={styles.pageHead}>
        <RepositoryHeader
          forkedCount={forkedCount}
          params={params}
          staredCount={staredCount}
          watchedCount={watchedCount}
        />
        <RepositoryNavigations
          issuesCount={issuesCount}
          params={params}
          pullRequestsCount={pullRequestsCount}
          projectsCount={projectsCount}
          routes={routes}
          session={session}
        />
      </div>
      {children}
    </div>
  )
}

export default connect(state => ({
  repository: state.repository,
  fetched: state.fetched
}))(Repository)
