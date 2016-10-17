import React, { Component, PropTypes } from 'react'

export default class Branches extends Component {
  static propTypes = {
    repo: PropTypes.string,
    branch: PropTypes.string,
    branches: PropTypes.array
  }

  static defaultProps = {
    repo: 'dummy_repo',
    branch: 'dummy_branch',
    branches: []
  }

  render = () => {
    const branches = this.props.branches.map((commit, idx) => (
      <li
        key={idx}>
        id: {commit.id}<br/>
        message: {commit.message}<br/>
        date: {commit.date.toString()}<br/>
      </li>
    ))
    return (
      <div>
        <h2>branches</h2>
        <ul>
          {branches}
        </ul>
      </div>
    )
  }
}
