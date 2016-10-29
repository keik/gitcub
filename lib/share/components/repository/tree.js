import debug from 'debug'
import React, { Component, PropTypes } from 'react'
import styles from './tree.css'

const d = debug('keik:gh:components:repository:tree')

export default class RepoTree extends Component {
  static propTypes = {
  }

  render = () => {
    d(`render`)
    return (
      <div
        className={styles.container}>
        tree
      </div>
    )
  }
}
