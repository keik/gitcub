import React from 'react'

import Entries from './entries'
import FileContent from './file-content'
import Commits from './commits'
import Branches from './branches'
import Issues from './issues'
import styles from './index.css'

export default class RepositoryContents extends React.Component {
  constructor () {
    super()
    this.state = {
      showingContent: ''
    }
  }

  render () {
    const props = this.props
    let content
    switch (this.state.showingContent) {
    case '':
      content = (<Entries {...props} />)
      break
    case 'file-content':
      content = (<FileContent {...props} />)
      break
    case 'commits':
      content = (<Commits {...props} />)
      break
    case 'branches':
      content = (<Branches {...props} />)
      break
    case 'issues':
      content = (<Issues {...props} />)
      break
    case 'pull-requests':
      content = (<PullRequests {...props} />)
      break
    }
    return (
      <div className={styles.container}>
        {content}
      </div>
    )
  }
}

RepositoryContents.propTypes = {
  branches: React.PropTypes.arrayOf(React.PropTypes.string),
  initialBranch: React.PropTypes.string.isRequired,
  initialShowingContent: React.PropTypes.string.isRequired,
  commitsCount: React.PropTypes.number.isRequired,
  releasesCount: React.PropTypes.number.isRequired,
  contributorsCount: React.PropTypes.number.isRequired
}
