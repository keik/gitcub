import React from 'react'

export default class Entries extends React.Component {
  constructor () {
    super()
  }

  render () {
    const entries = this.props.entries.map((entry, idx) => (
      <li key={idx}>
        <a href={`/dummy_user/${this.props.repo}/tree/${this.props.branch}/${entry}`} onClick={this.handleClickEntry}>{entry}</a>
      </li>
    ))
    return (
      <div>
        <h2>entries</h2>
        <ul>{entries}</ul>
      </div>
    )
  }

  handleClickEntry () {
    console.log(1)
  }
}

Entries.propTypes = {
  entries: React.PropTypes.array
}

Entries.defaultProps = {
  entries: []
}
