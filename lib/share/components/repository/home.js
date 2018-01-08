// @flow

import debug from 'debug'
import React from 'react'

import styles from './home.css'
import Entries from './_partial/entries'
import NumbersSummary from './_partial/numbers-summary'
import TreeSelector from './_partial/tree-selector'
import Modal from '../common/modal'
import btnStyles from '../../styles/btn.css'
import dropdownStyles from '../../styles/dropdown.css'
import config from '../../../../config.json'

import type {
  Branch,
  Commit,
  Parent,
  Tag,
  TreeEntry
} from '../../../types/nodegit'

const d = debug('keik:gh:components:repository:home')
const { HOST, PORT } = config.env[process.env.NODE_ENV]

export default class RepoHome extends React.Component<{
  branches: Array<Branch>,
  commits: Array<{
    commit: Commit,
    parents: Array<Parent>,
    sha: string,
    url: string
  }>,
  entries: Array<TreeEntry>,
  params: {
    owner: string,
    repo: string,
    tree: string,
    splat: string
  },
  tags: Array<Tag>
}> {
  _cloneModal: ?Modal

  static defaultProps = {
    branches: [],
    commits: [],
    entries: [],
    tags: []
  }

  render() {
    d(`render`)
    const { params: { owner, repo, tree = 'master' } } = this.props
    return (
      <div className={styles.container}>
        <div className={styles.metaContent}>
          <span>No description or website provided.</span>
          <span>
            - <button>Edit</button>
          </span>
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
            href={`${owner}/${repo}/pull/new/${tree}`}
          >
            New pull request
          </a>
          <div
            className={`${styles.floatRight} ${dropdownStyles.dropdown}`}
            style={{ marginRight: 0 }}
          >
            <button
              className={btnStyles.primarySmBtn}
              onClick={() => {
                this._cloneModal && this._cloneModal.open()
              }}
            >
              Clone or download
            </button>
            <Modal width={300} ref={c => (this._cloneModal = c)}>
              <div
                className={`${styles.cloneModal} ${dropdownStyles.container}`}
              >
                <h2>Clone with HTTP</h2>
                <p>Use Git using the web URL.</p>
                <input
                  className={styles.cloneUri}
                  onClick={e => e.target.select()}
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
                href={`${owner}/${repo}/upload/${tree}`}
              >
                Upload files
              </a>
              <a
                className={btnStyles.defaultSmBtn}
                href={`${owner}/${repo}/find/${tree}`}
              >
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
