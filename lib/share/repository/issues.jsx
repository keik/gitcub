import React from 'react'

export default class Issues extends React.Component {
  constructor () {
    super()
  }

  render () {
    const issues = this.props.issues.map((issue, idx) => (
      <li key={idx}>
        <a href={`${this.props.user}/${this.props.repo}/tree/${this.props.branch}/${issue}`} onClick={this.handleClickIssue}>{issue}</a>
      </li>
    ))
    return (
      <div>
        <h2>issues</h2>
        <ul>{issues}</ul>
      </div>
    )
  }
}

Issues.propTypes = {
  user: React.PropTypes.string.isRequired,
  repo: React.PropTypes.string.isRequired,
  issues: React.PropTypes.array
}

Issues.defaultProps = {
  issues: []
}
