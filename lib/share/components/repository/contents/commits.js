import React, { Component, PropTypes } from 'react'

export default class Commits extends Component {
  static propTypes = {
    repo: PropTypes.string,
    branch: PropTypes.string,
    commits: PropTypes.array
  }

  static defaultProps = {
    repo: 'dummy_repo',
    branch: 'dummy_branch',
    commits: []
  }

  render = () => {
    const commits = this.props.commits.map((commit, idx) => (
      <li key={idx}>
        id: {commit.id}<br/>
        message: {commit.message}<br/>
        date: {commit.date.toString()}<br/>
      </li>
    ))
    return (
      <div>
        <h2>commits</h2>
        <ul>{commits}</ul>
      </div>
    )
  }
}
