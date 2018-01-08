// @flow

import debug from 'debug'
import * as React from 'react'
import PropTypes from 'prop-types'

import RepositoryHeader from './header'
import styles from './index.css'
import RepositoryNavigations from './navigations'

const d = debug('keik:gh:components:repository')

export default class Repository extends React.Component<{
  children: React.Node,
  forkedCount: number,
  params: {
    owner: string,
    repo: string
  },
  staredCount: number,
  watchedCount: number
}> {
  // DEV
  static defaultProps = {
    branch: 'master',
    contributorsCount: -1,
    forkedCount: -1,
    issuesCount: -1,
    projectsCount: -1,
    pullRequestsCount: -1,
    staredCount: -1,
    watchedCount: -1
  }

  render() {
    d('render')
    const { children } = this.props
    return (
      <div>
        <div className={styles.pageHead}>
          <RepositoryHeader {...this.props} />
          <RepositoryNavigations {...this.props} />
        </div>
        {children}
      </div>
    )
  }
}
