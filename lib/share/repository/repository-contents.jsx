import axios from 'axios'
import React from 'react'

import Entries from './entries'
import Issues from './issues'

export default class RepositoryContents extends React.Component {
  constructor () {
    super()
  }

  render () {
    const props = this.props

    let content
    switch (this.props.showingContent) {
    case '':
      content = <Entries {...props} />
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
        <select onChange={this.handleOnChangeBranch.bind(this)} value={this.props.branch}>
          {branchOptions}
        </select>
        <div ref="content">
          {content}
        </div>
      </div>
    )
  }

  handleOnChangeBranch (e) {
    const branch = e.target.value
    axios.get(`http://localhost:3000/api/v1/users/dummy_user/repositories/repo1/entries?branch=${branch}`)
      .then(res => {
        const entries = res.data
        this.props.onUpdate({branch, entries})
      })
      .catch(err => {
        console.error(err)
      })
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
