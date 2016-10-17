import React, { Component, PropTypes } from 'react'

import btnStyles from '../../../styles/btn.css'
import styles from './entries.css'

export default class Entries extends Component {
  static propTypes = {
    branches: PropTypes.arrayOf(PropTypes.string).isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    entries: PropTypes.array
  }

  static defaultProps = {
    branches: [],
    tags: [],
    entries: []
  }

  constructor(props) {
    super()
    this.state = {
      entries: props.initialEntries
    }
  }

  render = () => {
    const { branches, entries } = this.props
    return (
      <div
        className={styles.container}>
        <div
          className="container">
          <div>
            <span>No description or website provided.</span>
            <span>- <button>Edit</button></span>
          </div>
          <div>
            <nav>
              <ul
                className={styles.stats}>
                <li>
                  <a href="#">{this.props.commitsCount} commits</a>
                </li>
                <li>
                  <a href="#">{branches.length} branches</a>
                </li>
                <li>
                  <a href="#">{this.props.releasesCount} releases</a>
                </li>
                <li>
                  <a href="#">{this.props.contributorsCount} contributors</a>
                </li>
              </ul>
            </nav>
          </div>
          <div
            className={styles.fileNavigation}>
            <div>
              <button
                className={btnStyles.sm}>
                <i>Branch: </i>
                <span>master </span>
                <i className="fa fa-caret-down" />
              </button>
              <div
                className={styles.branchMenuModal}>
                <div
                  className={styles.branchMenuModalHeader}>
                  Switch branches/tags
                  <button><i className="fa fa-close" /></button>
                </div>
                <div>
                  <input />
                </div>
                <div>
                  <ul>
                    <li>
                      <a href="#">Branches</a>
                    </li>
                    <li>
                      <a href="#">Tags</a>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul>
                    <li>
                      <i className="fa fa-check" /> master
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <select>
              {branches.map((branch, i) => (
                 <option key={i}>
                   {branch}
                 </option>
               ))
              }
            </select>
            <a
              className={btnStyles.sm}
              href={`${this.props.user}/${this.props.repo}/pull/new/${this.props.branch}`}>
              New pull request
            </a>
            <div
              className={styles.dlBtns}>
              <button
                className={btnStyles.primarySm}>Clone or download
              </button>
            </div>
            <div
              className={styles.fileBtns}>
              <form
                className={styles.inline}>
                <input
                  className={btnStyles.sm}
                  type="submit"
                  value="Create new file"
                />
              </form>
              <a
                className={btnStyles.sm}
                href={`${this.props.user}/${this.props.repo}/upload/${this.props.branch}`}>
                Upload files
              </a>
              <a
                className={btnStyles.sm}
                href={`${this.props.user}/${this.props.repo}/find/${this.props.branch}`}>
                Find file
              </a>
            </div>
          </div>
          <div
            className={styles.commitTease}>
            commit tease
          </div>
          <div
            className={styles.entriesContainer}>
            <table
              className={styles.entries}>
              <tbody>
                {entries.map((entry, i) => (
                   <tr
                     key={i}>
                     <td className={styles.icon}>
                       <i className="fa fa-file-text-o" />
                     </td>
                     <td className={styles.name}>
                       <a
                         href={`/dummy_user/${this.props.repo}/tree/${this.props.branch}/${entry.path}`}
                         onClick={this.handleClickEntry}>
                         {entry.path}
                       </a>
                     </td>
                     <td className={styles.commitMessage}>
                       <a
                         href={`/dummy_user/${this.props.repo}/commit/${entry.commit}`}>
                         {entry.commitMessage}
                       </a>
                     </td>
                     <td className={styles.updateAt}>
                       {entry.updateAt}
                     </td>
                   </tr>
                 ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  handleClickEntry = (e) => {
    e.preventDefault()
    this.props.onUpdate({showingContent: 'file-content'})
  }
}
