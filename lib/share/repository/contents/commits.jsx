import React from 'react'

export default class Commits extends React.Component {
  constructor () {
    super()
  }

  render () {
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

Commits.propTypes = {
  repo: React.PropTypes.string,
  branch: React.PropTypes.string,
  commits: React.PropTypes.array
}

Commits.defaultProps = {
  repo: 'dummy_repo',
  branch: 'dummy_branch',
  commits: []
}
