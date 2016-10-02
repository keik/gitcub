import React from 'react'

import Entries from './entries'
import FileContent from './file-content'
import Commits from './commits'
import Branches from './branches'
import Issues from './issues'
import PullRequests from './pull-requests'
import Projects from './projects'
import Wiki from './wiki'
import Pulse from './pulse'
import Graphs from './graphs'
import Settings from './settings'

export default class RepositoryContents extends React.Component {
  constructor (props) {
    super()
    this.state = {
      showingContent: ''
    }
    console.log(props);
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
    case 'pulls':
      content = (<PullRequests {...props} />)
      break
    case 'projects':
      content = (<Projects {...props} />)
      break
    case 'wiki':
      content = (<Wiki {...props} />)
      break
    case 'pulse':
      content = (<Pulse {...props} />)
      break
    case 'graphs':
      content = (<Graphs {...props} />)
      break
    case 'settings':
      content = (<Settings {...props} />)
      break
    }
    return (
      <div>
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
