import React from 'react'

export default class Repository extends React.Component {
  constructor () {
    super()
  }

  render () {
    const entries = this.props.entries.map((entry, idx) => (
      <li key={idx}>
        <a onClick={this.handleClickEntry}>{entry}</a>
      </li>
    ))
    const commits = this.props.commits.map((commit, idx) => (
      <li key={idx}>
        id: {commit.id}<br/>
        message: {commit.message}<br/>
        date: {commit.date.toString()}<br/>
      </li>
    ))
    return (
      <div>
        <h1>{this.props.repo}</h1>
        <h2>entries</h2>
        <ul>{entries}</ul>
        <h2>commits</h2>
        <ul>{commits}</ul>
        <h2>content</h2>
        <pre><code>{this.props.content}</code></pre>

      </div>
    )
  }

  handleClickEntry () {
    console.log(1)
  }
}

Repository.propTypes = {
  repo: React.PropTypes.string,
  entries: React.PropTypes.array,
  commits: React.PropTypes.array,
  content: React.PropTypes.string
}

Repository.defaultProps = {
  repo: '',
  entries: [],
  commits: [],
  content: ''
}
