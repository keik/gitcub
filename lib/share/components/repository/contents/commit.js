import debug from 'debug'
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import btnStyles from '../../../styles/btn.css'
import styles from './commit.css'

const d = debug('keik:gh:components:repository:contents:commit')

export default class Commit extends Component {
  static propTypes = {
    date: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    params: PropTypes.shape({
      owner: PropTypes.string.isRequired,
      repo: PropTypes.string.isRequired,
      sha: PropTypes.string.isRequired,
    }).isRequired,
    patches: PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
    parent: PropTypes.shape({
      sha: PropTypes.string.isRequired,
    }).isRequired,
  }

  render = () => {
    d('render', this.props)
    const { commit, params: { owner, repo, sha } } = this.props
    return (
      <div className={styles.container}>
        commit
      </div>
    )
  }
}
