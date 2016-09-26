import React from 'react'

import RepositoryHeader from './repository-header'
import RepositoryNavigations from './repository-navigations'
import RepositoryContents from './repository-contents'

export default class RepositoryApp extends React.Component {
  constructor (props) {
    super()
  }

  render () {
    const props = this.props
    return (
      <div>
        <RepositoryHeader {...props} />
        <RepositoryNavigations {...props} onUpdate={this.onUpdate.bind(this)}/>
        <RepositoryContents ref="repositoryContents" {...props} />
      </div>
    )
  }

  onUpdate (state) {
    this.setState(state)
    this.refs.repositoryContents.setState(state)
  }
}

// DEV
RepositoryApp.defaultProps = {
  repo: 'dummy_repo',
  user: 'dummy_user',
  watchedCount: -1,
  staredCount: -1,
  forkedCount: -1,
  branches: ['dummy_branch_1', 'dummy_branch_2'],
  initialShowingContent: '',
  commitsCount: -1,
  releasesCount: -1,
  contributorsCount: -1,
  issuesCount: -1,
  pullRequestsCount: -1,
  projectsCount: -1
}
