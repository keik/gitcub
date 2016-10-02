import React from 'react'

export default class Branches extends React.Component {
  constructor () {
    super()
  }

  render () {
    const branches = this.props.branches.map((commit, idx) => (
      <li key={idx}>
        id: {commit.id}<br/>
        message: {commit.message}<br/>
        date: {commit.date.toString()}<br/>
      </li>
    ))
    return (
      <div>
        <h2>branches</h2>
        <ul>{branches}</ul>
      </div>
    )
  }
}

Branches.propTypes = {
  repo: React.PropTypes.string,
  branch: React.PropTypes.string,
  branches: React.PropTypes.array
}

Branches.defaultProps = {
  repo: 'dummy_repo',
  branch: 'dummy_branch',
  branches: []
}
