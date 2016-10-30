import debug from 'debug'
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import Modal from '../../common/modal'
import { Tab, TabItems, TabItem, TabPanel } from '../../common/tab'
import btnStyles from '../../../styles/btn.css'
import styles from './tree-selector.css'

const d = debug('keik:gh:components:repository:partial:tree-selector')

export default class Entries extends Component {
  static propTypes = {
    branches: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  render = () => {
    d('render')
    const { branches, params: { owner, repo }, tags } = this.props
    return (
      <div className={styles.container}>
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
          width={300}
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
          <Tab style={{backgroundColor: '#f8f8f8'}}>
            <TabItems>
              <TabItem target="branches" active>Branches</TabItem>
              <TabItem target="tags">Tags</TabItem>
            </TabItems>
            <TabPanel name="branches">
              <ul>
                {branches.map(branch => (
                   <li key={branch}>
                     <Link to={`/${owner}/${repo}/tree/${branch}`}>
                       {branch}
                     </Link>
                   </li>
                 ))}
              </ul>
            </TabPanel>
            <TabPanel name="tags">
              <ul>
                {tags.map(tag => (
                   <li key={tag}>
                     <Link to={`/${owner}/${repo}/tree/${tag}`}>
                       {tag}
                     </Link>
                   </li>
                 ))}
              </ul>
            </TabPanel>
          </Tab>
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
      </div>
    )
  }
}
