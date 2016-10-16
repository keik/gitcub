import React from 'react'

import btnStyles from '../../../styles/btn.css'
import styles from './entries.css'

export default class Entries extends React.Component {
  constructor (props) {
    super()
    this.state = {
      entries: props.initialEntries
    }
  }

  render () {
    const branches = this.props.branches.map((branch, idx) => (
      <option key={idx}>{branch}</option>
    ))
    const entries = this.state.entries.map((entry, idx) => (
      <tr key={idx}>
        <td><i className="fa fa-file-text-o" /> <a href={`/dummy_user/${this.props.repo}/tree/${this.props.branch}/${entry}`} onClick={this.handleClickEntry.bind(this)}>{entry}</a></td>
        <td><a className={styles.commitMessage} href="#">COMMIT_MESSAGE</a></td>
        <td>UPDATE_AT</td>
      </tr>
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
          <div className={styles.fileNavigation}>
            <select>
              {branches}
            </select>
            <a className={btnStyles.sm} href={`${this.props.user}/${this.props.repo}/pull/new/${this.props.branch}`}>New pull request</a>

            <div className={styles.dlBtns}>
              <button className={btnStyles.primarySm}>Clone or download</button>
            </div>
            <div className={styles.fileBtns}>
              <form className={styles.inline}>
                <input className={btnStyles.sm} type="submit" value="Create new file" />
              </form>
              <a className={btnStyles.sm} href={`${this.props.user}/${this.props.repo}/upload/${this.props.branch}`}>Upload files</a>
              <a className={btnStyles.sm} href={`${this.props.user}/${this.props.repo}/find/${this.props.branch}`}>Find file</a>
            </div>
          </div>
          <div className={styles.commitTease}>
            commit tease
          </div>
          <div className={styles.entriesContainer}>
            <table className={styles.entries}>
              <tbody>
                {entries}
              </tbody>
            </table>
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
