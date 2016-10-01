import React from 'react'

import Header from '../header'
import RepositoryHeader from './repository-header'
import RepositoryNavigations from './repository-navigations'
import RepositoryContents from './repository-contents/index'

import styles from './index.css'

export default class RepositoryApp extends React.Component {
  constructor (props) {
    super()
  }

  render () {
    const props = Object.assign({}, this.props, this.state)
    return (
      <div className={styles.container}>
        <Header />
        <RepositoryHeader {...props} />
        <RepositoryNavigations {...props} onUpdate={this.onUpdate.bind(this)} />
        <RepositoryContents ref="repositoryContents" {...props} onUpdate={this.onUpdate.bind(this)} />
      </div>
    )
  }

  onUpdate (state) {
    this.setState(state)
    this.refs.repositoryContents.setState(state)
  }
}

RepositoryApp.propTypes = {
  repo: React.PropTypes.string.isRequired,
  user: React.PropTypes.string.isRequired,
  branches: React.PropTypes.arrayOf(React.PropTypes.string)
}

// DEV
RepositoryApp.defaultProps = {
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
