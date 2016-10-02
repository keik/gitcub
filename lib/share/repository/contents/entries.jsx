import React from 'react'

import styles from './entries.css'

export default class Entries extends React.Component {
  constructor () {
    super()
  }

  render () {
    const entries = this.props.entries.map((entry, idx) => (
      <li key={idx}>
        <a href={`/dummy_user/${this.props.repo}/tree/${this.props.branch}/${entry}`} onClick={this.handleClickEntry.bind(this)}>{entry}</a>
      </li>
    ))
    return (
      <div className={styles.container}>
        <div className="container">
          <div>
            <span>No description or website provided.</span>
            <span>- <button>Edit</button></span>
          </div>
          <div>
            <nav>
              <ul className={styles.stats}>
                <li><a href="">{this.props.commitsCount} commits</a></li>
                <li><a href="">{-1} branches</a></li>
                <li><a href="">{this.props.releasesCount} releases</a></li>
                <li><a href="">{this.props.contributorsCount} contributors</a></li>
              </ul>
            </nav>
          </div>
          <div>
            <select>
              {this.props.branches}
            </select>
          </div>
          <div>
            repository meta
          </div>
          <div className={styles.commitTease}>
            commit tease
          </div>
          <div className={styles.entries}>
            entries
            <ul>{entries}</ul>
          </div>
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
  branches: React.PropTypes.array,
  entries: React.PropTypes.array
}

Entries.defaultProps = {
  branches: [],
  entries: []
}
