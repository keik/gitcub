import debug from 'debug'
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import Modal from '../../common/modal'
import btnStyles from '../../../styles/btn.css'
import styles from './entries.css'

const d = debug('keik:gh:components:repository:contents:entries')

export default class Entries extends Component {
  static propTypes = {
    branch: PropTypes.string.isRequired,
    branches: PropTypes.arrayOf(PropTypes.string).isRequired,
    entries: PropTypes.arrayOf(PropTypes.shape({
      path: PropTypes.string.isRequired,
      lastCommit: PropTypes.shape({
        message: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    })),
    params: PropTypes.shape({
      repo: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired,
    }).isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  static defaultProps = {
    branches: [],
    commits: [],
    entries: [],
    tags: [],
  }

  render = () => {
    d('render', this.props)
    const { params: { user, repo }, branch, branches, commits, entries, tags } = this.props
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
                <Link to={`/${user}/${repo}/commits`}>
                  <i className="fa fa-clock-o" />
                  <span className={styles.emphasized}>{commits.length}</span> commits
                </Link>
              </li>
              <li>
                <Link to={`/${user}/${repo}/branches`}>
                  <i className="fa fa-code-fork" />
                  <span className={styles.emphasized}>{branches.length}</span> branches
                </Link>
              </li>
              <li>
                <Link to={`/${user}/${repo}/releases`}>
                  <i className="fa fa-tag" />
                  <span className={styles.emphasized}>{tags.length}</span> releases
                </Link>
              </li>
              <li>
                <Link to={`/${user}/${repo}/graphs/contributors`}>
                  <i className="fa fa-users" />
                  <span className={styles.emphasized}>{this.props.contributorsCount}</span> contributors
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div
          className={styles.fileNavigation}>
          <button
            className={btnStyles.defaultSmBtn}
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
                {branches.map((branch, i) =>
                  <li key={i}>
                    <i className="fa fa-check" /> {branch}
                  </li>
                 )}
              </ul>
            </div>
          </Modal>
          <a
            className={btnStyles.defaultSmBtn}
            href={`${user}/${repo}/pull/new/${branch}`}>
            New pull request
          </a>
          <div
            className={styles.floatRight}
            style={{marginRight: 0}}
          >
            <button
              className={btnStyles.primarySmBtn}>Clone or download
            </button>
          </div>
          <div className={styles.floatRight}>
            <div className={btnStyles.group}>
              <form
                className={styles.inline}>
                <input
                  className={btnStyles.defaultSmBtn}
                type="submit"
                  value="Create new file"
                />
              </form>
              <a
                className={btnStyles.defaultSmBtn}
                href={`${user}/${repo}/upload/${branch}`}>
                Upload files
              </a>
              <a
                className={btnStyles.defaultSmBtn}
                href={`${user}/${repo}/find/${branch}`}>
                Find file
              </a>
            </div>
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
                 <tr key={i}>
                   <td className={styles.icon}>
                     <i className="fa fa-file-text-o" />
                   </td>
                   <td className={styles.name}>
                     <Link to={`/${user}/${repo}/blob/${branch}/${entry.path}`}>
                       {entry.path}
                     </Link>
                   </td>
                   <td className={styles.commitMessage}>
                     <Link to={`/${user}/${repo}/commit/${entry.lastCommit.id}`}>
                       {entry.lastCommit.message}
                     </Link>
                   </td>
                   <td className={styles.updateAt}>
                     <time-ago datetime={entry.lastCommit.date} />
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
