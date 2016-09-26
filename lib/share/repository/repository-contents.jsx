import React from 'react'

import Entries from './entries'
import Issues from './issues'

export default class RepositoryContents extends React.Component {
  constructor (props) {
    super()
    this.state = {showingContent: props.initialShowingContent}
  }

  render () {
    const props = this.props

    let content
    switch (this.state.showingContent) {
    case '':
      content = <Entries {...props}/>
        break
    case 'issues':
      content = <Issues />
      break
    }

    const branchOptions = this.props.branches.map((branch, idx) => (
      <option key={idx}>{branch}</option>
    ))

    return (
      <div>
        <nav>
          <ul>
            <li><a href="">{this.props.commitsCount} commits</a></li>
            <li><a href="">{this.props.branches.length} branches</a></li>
            <li><a href="">{this.props.releasesCount} releases</a></li>
            <li><a href="">{this.props.contributorsCount} contributors</a></li>
          </ul>
        </nav>
        <select>
          {branchOptions}
        </select>
        <div ref="content">
          {content}
        </div>
      </div>
    )
  }
}

RepositoryContents.propTypes = {
  branches: React.PropTypes.arrayOf(React.PropTypes.string),
  initialShowingContent: React.PropTypes.string.isRequired,
  commitsCount: React.PropTypes.number.isRequired,
  releasesCount: React.PropTypes.number.isRequired,
  contributorsCount: React.PropTypes.number.isRequired
}

RepositoryContents.defaultProps = {
  branches: []
}
