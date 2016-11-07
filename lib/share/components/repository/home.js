import debug from 'debug'
import React, { Component, PropTypes } from 'react'

import styles         from './home.css'
import Entries        from './_partial/entries'
import NumbersSummary from './_partial/numbers-summary'
import TreeSelector   from './_partial/tree-selector'
import Modal          from '../common/modal'
import btnStyles      from '../../styles/btn.css'
import dropdownStyles from '../../styles/dropdown.css'
import config         from '../../../../config.json'

const d = debug('keik:gh:components:repository:home')
const { HOST, PORT } = config.env[process.env.NODE_ENV]

export default class RepoHome extends Component {
  static propTypes = {
    branches: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
    commits: PropTypes.arrayOf(PropTypes.shape({
      commit: PropTypes.shape({
        author: PropTypes.shape({
          date: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        }).isRequired,
        message: PropTypes.string.isRequired,
      }).isRequired,
      html_url: PropTypes.string.isRequired,
      sha: PropTypes.string.isRequired,
    })).isRequired,
    entries: PropTypes.arrayOf(PropTypes.shape({
      lastCommit: PropTypes.shape({
        author: PropTypes.shape({
          date: PropTypes.string.isRequired,
        }).isRequired,
        message: PropTypes.string.isRequired,
        sha: PropTypes.string.isRequired,
      }).isRequired,
    })).isRequired,
    params: PropTypes.shape({
      owner: PropTypes.string.isRequired,
      repo: PropTypes.string.isRequired,
      tree: PropTypes.string,
      splat: PropTypes.string,
    }).isRequired,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        ref: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
  }

  static defaultProps = {
    branches: [],
    commits: [],
    entries: [],
    tags: []
  }

  render = () => {
    d(`render`)
    const { params: { owner, repo, tree='master' } } = this.props
    return (
      <div className={styles.container}>
        <div className={styles.metaContent}>
          <span>No description or website provided.</span>
          <span>- <button>Edit</button></span>
        </div>
        <nav>
          <NumbersSummary {...this.props} />
        </nav>
        <div className={styles.fileNavigation}>
          <div className={styles.treeSelector}>
            <TreeSelector {...this.props} />
          </div>
          <a
            className={btnStyles.defaultSmBtn}
            href={`${owner}/${repo}/pull/new/${tree}`}>
            New pull request
          </a>
          <div
            className={`${styles.floatRight} ${dropdownStyles.dropdown}`}
            style={{marginRight: 0}}
          >
            <button
              className={btnStyles.primarySmBtn}
              onClick={(e) => {this._cloneModal.open()}}
            >
              Clone or download
            </button>
            <Modal
              width={300}
              ref={c => this._cloneModal = c}
            >
              <div className={`${styles.cloneModal} ${dropdownStyles.container}`}>
                <h2>
                  Clone with HTTP
                </h2>
                <p>
                  Use Git using the web URL.
                </p>
                <input
                  className={styles.cloneUri}
                  onClick={(e) => e.target.select()}
                  readOnly
                  type="text"
                  value={`http:///${HOST}:${PORT}/${owner}/${repo}.git`}
                />
              </div>
            </Modal>
          </div>
          <div className={styles.floatRight}>
            <div className={btnStyles.group}>
              <form className={styles.inline}>
                <input
                  className={btnStyles.defaultSmBtn}
                  type="submit"
                  value="Create new file"
                />
              </form>
              <a
                className={btnStyles.defaultSmBtn}
                href={`${owner}/${repo}/upload/${tree}`}>
                Upload files
              </a>
              <a
                className={btnStyles.defaultSmBtn}
                href={`${owner}/${repo}/find/${tree}`}>
                Find file
              </a>
            </div>
          </div>
        </div>
        <Entries {...this.props} />
      </div>
    )
  }
}
