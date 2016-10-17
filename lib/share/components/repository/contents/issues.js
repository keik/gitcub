import React, { Component, PropTypes } from 'react'

export default class Issues extends Component {
  static propTypes = {
    user: PropTypes.string.isRequired,
    repo: PropTypes.string.isRequired,
    issues: PropTypes.array
  }

  static defaultProps = {
    issues: []
  }

  render = () => {
    const issues = this.props.issues.map((issue, idx) => (
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
        <h2>issues</h2>
        <ul>
          {issues}
        </ul>
      </div>
    )
  }
}
