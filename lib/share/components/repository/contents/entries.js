import React, { Component, PropTypes } from 'react'

import Modal from '../../common/modal'
import btnStyles from '../../../styles/btn.css'
import styles from './entries.css'

export default class Entries extends Component {
  static propTypes = {
    branches: PropTypes.arrayOf(PropTypes.string).isRequired,
    entries: PropTypes.arrayOf(PropTypes.shape({
      path: PropTypes.string.isRequired,
      lastCommit: PropTypes.shape({
        message: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    })),
    repo: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  static defaultProps = {
    branches: [],
    tags: [],
    entries: [],
  }

  render = () => {
    const { branches, entries } = this.props
    return (
      <div
        className={styles.container}>
        <div
          className={styles.metaContent}
        >
          <span>No description or website provided.</span>
          <span>- <button>Edit</button></span>
        </div>
        <div>
          <nav>
            <ul
              className={styles.numbersSummary}>
              <li>
                <a href="#">
                  <i className="fa fa-clock-o" />
                  <span className={styles.emphasized}>{this.props.commitsCount}</span> commits
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-code-fork" />
                  <span className={styles.emphasized}>{branches.length}</span> branches
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-tag" />
                  <span className={styles.emphasized}>{this.props.releasesCount}</span> releases
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-users" />
                  <span className={styles.emphasized}>{this.props.contributorsCount}</span> contributors
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div
          className={styles.fileNavigation}>
          <button
            className={styles.branchMenuButton}
            onClick={(e) => {this._branchMenuModal.open()}}
          >
            <i>Branch: </i>
            <span>master </span>
            <i className="fa fa-caret-down" />
          </button>
          <Modal
            className={styles.branchMenuModal}
            ref={c => this._branchMenuModal = c}
          >
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
                {
                  branches.map((branch, i) => (
                    <li key={i}>
                      <i className="fa fa-check" /> {branch}
                    </li>
                  ))
                }
              </ul>
            </div>
          </Modal>
          <a
            className={btnStyles.smBtn}
            href={`${this.props.user}/${this.props.repo}/pull/new/${this.props.branch}`}>
            New pull request
          </a>
          <div
            className={styles.dlBtns}>
            <button
              className={btnStyles.primarySmBtn}>Clone or download
            </button>
          </div>
          <div
            className={styles.fileBtns}>
            <form
              className={styles.inline}>
              <input
                className={btnStyles.smBtn}
                type="submit"
                value="Create new file"
              />
            </form>
            <a
              className={btnStyles.smBtn}
              href={`${this.props.user}/${this.props.repo}/upload/${this.props.branch}`}>
              Upload files
            </a>
            <a
              className={btnStyles.smBtn}
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
                       href={`/dummy_user/${this.props.repo}/commit/${entry.lastCommit.id}`}>
                       {entry.lastCommit.message}
                     </a>
                   </td>
                   <td className={styles.updateAt}>
                     {entry.lastCommit.date}
                   </td>
                 </tr>
               ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  handleClickEntry = (e) => {
    e.preventDefault()
    this.props.onUpdate({showingContent: 'file-content'})
  }
}
