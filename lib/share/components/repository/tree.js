import debug from 'debug'
import React, { Component, PropTypes } from 'react'

import styles from './tree.css'
import Breadcrumbs from './_partial/breadcrumbs'
import Entries from './_partial/entries'
import TreeSelector from './_partial/tree-selector'

const d = debug('keik:gh:components:repository:tree')

export default class RepoTree extends Component {
  static propTypes = {
    branches: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired
      }).isRequired
    ).isRequired,
    entries: PropTypes.arrayOf(
      PropTypes.shape({
        lastCommit: PropTypes.shape({
          author: PropTypes.shape({
            date: PropTypes.string.isRequired
          }).isRequired,
          message: PropTypes.string.isRequired,
          sha: PropTypes.string.isRequired
        }).isRequired
      })
    ).isRequired,
    params: PropTypes.shape({
      owner: PropTypes.string.isRequired,
      repo: PropTypes.string.isRequired,
      tree: PropTypes.string,
      splat: PropTypes.string
    }).isRequired,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        ref: PropTypes.string.isRequired
      }).isRequired
    ).isRequired
  }

  render() {
    d(`render`)
    return (
      <div className={styles.container}>
        <div className={styles.fileNavigation}>
          <div className={styles.treeSelector}>
            <TreeSelector {...this.props} />
          </div>
          <div className={styles.breadcrumbs}>
            <Breadcrumbs {...this.props} />
          </div>
        </div>
        <Entries {...this.props} />
      </div>
    )
  }
}
