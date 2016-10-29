import debug from 'debug'
import React, { Component, PropTypes } from 'react'

import Modal from '../../common/modal'
import btnStyles from '../../../styles/btn.css'
import styles from './tree-selector.css'

const d = debug('keik:gh:components:repository:partial:tree-selector')

export default class Entries extends Component {
  static propTypes = {
    branches: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  render = () => {
    d('render')
    const { branches } = this.props
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
      </div>
    )
  }
}
