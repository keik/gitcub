// @flow

import debug from 'debug'
import React from 'react'

import Button from '../common/atoms/Button'
import SegmentedButtonsContainer from '../common/layouts/SegmentedButtonsContainer'
import styles from './Home.css'
import Entries from './_partial/Entries'
import NumbersSummary from './_partial/NumbersSummary'
import TreeSelector from './_partial/TreeSelector'
import Modal from '../common/Modal'
import dropdownStyles from '../../styles/dropdown.css'
import config from '../../../../config'

import type {
  BranchObj,
  CommitObj,
  ParentObj,
  TagObj,
  TreeEntryObj
} from '../../../types/nodegit'

const d = debug('keik:gh:components:repository:home')
const { HOST, PORT } = config.env[process.env.NODE_ENV || 'development']

export default class RepoHome extends React.Component<{
  branches: Array<BranchObj>,
  commits: Array<{
    commit: CommitObj,
    parents: Array<ParentObj>,
    sha: string,
    url: string
  }>,
  contributorsCount: number,
  entries: Array<TreeEntryObj>,
  params: {
    owner: string,
    repo: string,
    tree: string,
    splat: string
  },
  tags: Array<TagObj>
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
    const {
      params: { owner, repo, tree = 'master' }
    } = this.props
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
          <Button as="a" small href={`${owner}/${repo}/pull/new/${tree}`}>
            New pull request
          </Button>
          <div
            className={`${styles.floatRight} ${dropdownStyles.dropdown}`}
            style={{ marginRight: 0 }}
          >
            <Button
              primary
              small
              onClick={() => {
                this._cloneModal && this._cloneModal.open()
              }}
            >
              Clone or download
            </Button>
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
            <SegmentedButtonsContainer>
              <Button as="input" small type="submit" value="Create new file" />
              <Button as="a" href={`${owner}/${repo}/upload/${tree}`} small>
                Upload files
              </Button>
              <Button as="a" href={`${owner}/${repo}/find/${tree}`} small>
                Find file
              </Button>
            </SegmentedButtonsContainer>
          </div>
        </div>
        <Entries {...this.props} />
      </div>
    )
  }
}
