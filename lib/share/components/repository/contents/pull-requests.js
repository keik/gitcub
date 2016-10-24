import React, { Component, PropTypes } from 'react'

export default class PullRequests extends Component {
  static propTypes = {
    owner: PropTypes.string.isRequired,
    repo: PropTypes.string.isRequired,
    pulls: PropTypes.array
  }

  static defaultProps = {
    pulls: []
  }

  render = () => {
    const { params: { id, owner }, branch } = this.props
    const pulls = this.props.pulls.map((issue, idx) => (
      <li
        key={idx}>
        <a
          href={`${owner}/${repo}/tree/${branch}/${issue}`}
          onClick={this.handleClickIssue}>
          {issue}
        </a>
      </li>
    ))
    return (
      <div>
        <h2>pulls</h2>
        <ul>
          {pulls}
        </ul>
      </div>
    )
  }
}
