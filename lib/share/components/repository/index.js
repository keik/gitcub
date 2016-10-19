import React, { Component, PropTypes } from 'react'

import RepositoryContents from './contents/index'
import RepositoryHeader from './header'
import RepositoryNavigations from './navigations'
import Footer from '../footer'
import Header from '../header'
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

  constructor(props) {
    super()
    this.state = {
      user: props.user,
      repo: props.repo,
      branches: props.branches,
      branch: props.initialBranch,
      commits: props.initialCommits,
      entries: props.initialEntries,
    }
  }

  render = () => {
    const props = Object.assign({}, this.props, this.state)
    return (
      <div>
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
        <Footer />
      </div>
    )
  }

  onUpdate = (state) => {
    this.setState(state)
    this.refs.repositoryContents.setState(state)
  }
}
