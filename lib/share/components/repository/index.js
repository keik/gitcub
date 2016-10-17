import React, { Component, PropTypes } from 'react'

import Header from '../header'
import RepositoryHeader from './header'
import RepositoryNavigations from './navigations'
import RepositoryContents from './contents/index'
import styles from './index.css'

export default class RepositoryApp extends Component {

  static propTypes = {
    repo: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    branches: PropTypes.arrayOf(PropTypes.string)
  }

  // DEV
  static defaultProps = {
    user: 'dummy_user',
    watchedCount: -1,
    staredCount: -1,
    forkedCount: -1,
    initialShowingContent: '',
    commitsCount: -1,
    releasesCount: -1,
    contributorsCount: -1,
    issuesCount: -1,
    pullRequestsCount: -1,
    projectsCount: -1
  }

  render = () => {
    const props = Object.assign({}, this.props, this.state)
    return (
      <div
        className={styles.container}>
        <Header
          {...props}
        />
        <div
          className={styles.pageHead}>
          <RepositoryHeader
            {...props}
          />
          <RepositoryNavigations
            {...props}
            onUpdate={this.onUpdate}
          />
        </div>
        <RepositoryContents
          {...props}
          onUpdate={this.onUpdate}
          ref="repositoryContents"
        />
      </div>
    )
  }

  onUpdate = (state) => {
    this.setState(state)
    this.refs.repositoryContents.setState(state)
  }
}
