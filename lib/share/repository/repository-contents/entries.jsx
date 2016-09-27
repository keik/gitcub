import React from 'react'

export default class Entries extends React.Component {
  constructor () {
    super()
    this.style = {
      container: {
        border: '1px solid #cccccc'
      }
    }
  }

  render () {
    const entries = this.props.entries.map((entry, idx) => (
      <li key={idx}>
        <a href={`/dummy_user/${this.props.repo}/tree/${this.props.branch}/${entry}`} onClick={this.handleClickEntry.bind(this)}>{entry}</a>
      </li>
    ))
    return (
      <div style={this.style.container}>
        <div>
          repository meta
        </div>
        <div>
          overall summary
          <nav>
            <ul>
              <li><a href="">{this.props.commitsCount} commits</a></li>
              <li><a href="">{-1} branches</a></li>
              <li><a href="">{this.props.releasesCount} releases</a></li>
              <li><a href="">{this.props.contributorsCount} contributors</a></li>
            </ul>
          </nav>
        </div>
        <div>
          branch selector
          <select>
          </select>
        </div>
        <div>
          repository meta
        </div>
        <div>
          commit tease
        </div>
        <div>
          entries
          <ul>{entries}</ul>
        </div>
      </div>
    )
  }

  handleClickEntry (e) {
    e.preventDefault()
    this.props.onUpdate({showingContent: 'file-content'})
  }
}

Entries.propTypes = {
  entries: React.PropTypes.array
}

Entries.defaultProps = {
  entries: []
}
