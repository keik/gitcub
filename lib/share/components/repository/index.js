import debug from 'debug'
import React, { Component, PropTypes } from 'react'

import RepositoryHeader from './header'
import RepositoryNavigations from './navigations'
import styles from './index.css'

const d = debug('keik:gh:components:repository')

export default class Repository extends Component {

  static propTypes = {
    params: PropTypes.shape({
      owner: PropTypes.string.isRequired,
      repo: PropTypes.string.isRequired,
    }).isRequired,
  }

  // DEV
  static defaultProps = {
    branch: 'master',
    contributorsCount: -1,
    forkedCount: -1,
    issuesCount: -1,
    projectsCount: -1,
    pullRequestsCount: -1,
    staredCount: -1,
    watchedCount: -1,
  }

  render = () => {
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
