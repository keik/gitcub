import React from 'react'

export default class PullRequests extends React.Component {
  constructor () {
    super()
  }

  render () {
    const pulls = this.props.pulls.map((issue, idx) => (
      <li key={idx}>
        <a href={`${this.props.user}/${this.props.repo}/tree/${this.props.branch}/${issue}`} onClick={this.handleClickIssue}>{issue}</a>
      </li>
    ))
    return (
      <div>
        <h2>pulls</h2>
        <ul>{pulls}</ul>
      </div>
    )
  }
}

PullRequests.propTypes = {
  user: React.PropTypes.string.isRequired,
  repo: React.PropTypes.string.isRequired,
  pulls: React.PropTypes.array
}

PullRequests.defaultProps = {
  pulls: []
}
