import React, { Component, PropTypes } from 'react'

export default class PullRequests extends Component {
  static propTypes = {
    user: PropTypes.string.isRequired,
    repo: PropTypes.string.isRequired,
    pulls: PropTypes.array
  }

  static defaultProps = {
    pulls: []
  }

  render = () => {
    const pulls = this.props.pulls.map((issue, idx) => (
      <li
        key={idx}>
        <a
          href={`${this.props.user}/${this.props.repo}/tree/${this.props.branch}/${issue}`}
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
