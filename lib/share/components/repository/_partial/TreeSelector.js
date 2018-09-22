// @flow

import React from 'react'

import styles from './TreeSelector.css'
import Modal from '../../common/Modal'
import { Tab, TabItems, TabItem, TabPanel } from '../../common/Tab'
import btnStyles from '../../../styles/btn.css'

import type { BranchObj, TagObj } from '../../../../types/nodegit'

export default class TreeSelector extends React.Component<{
  branches: Array<BranchObj>,
  params: {
    owner: string,
    repo: string,
    tree: string
  },
  tags: Array<TagObj>
}> {
  _branchMenuModal: ?Modal

  render() {
    const {
      branches,
      params: { owner, repo, tree = 'master' },
      tags
    } = this.props
    return (
      <div className={styles.container}>
        <button
          className={btnStyles.defaultSmBtn}
          onClick={() => {
            this._branchMenuModal && this._branchMenuModal.open()
          }}
        >
          <i>Branch: </i>
          <span>{tree} </span>
          <i className="fa fa-caret-down" />
        </button>
        <Modal
          className={styles.branchMenuModal}
          width={300}
          ref={c => (this._branchMenuModal = c)}
        >
          <div className={styles.branchMenuModalHeader}>
            Switch branches/tags
            <button
              className={styles.closeBtn}
              onClick={() => {
                this._branchMenuModal && this._branchMenuModal.close()
              }}
            >
              <i className="fa fa-close" />
            </button>
          </div>
          <div style={{ backgroundColor: '#f8f8f8' }}>
            <div className={styles.textFilter}>
              <input placeholder="Find a tag..." />
            </div>
            <Tab>
              <TabItems>
                <TabItem target="branches" active>
                  Branches
                </TabItem>
                <TabItem target="tags">Tags</TabItem>
              </TabItems>
              <TabPanel name="branches">
                <ul className={styles.branches}>
                  {branches.map((branch, i) => (
                    <li key={i}>
                      <a href={`/${owner}/${repo}/tree/${branch.name}`}>
                        {branch.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </TabPanel>
              <TabPanel name="tags">
                <ul className={styles.branches}>
                  {tags.map((tag, i) => (
                    <li key={i}>
                      <a href={`/${owner}/${repo}/tree/${tag.ref}`}>
                        {tag.ref}
                      </a>
                    </li>
                  ))}
                </ul>
              </TabPanel>
            </Tab>
          </div>
        </Modal>
      </div>
    )
  }
}
