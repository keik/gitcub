import debug                           from 'debug'
import React, { Component, PropTypes } from 'react'
import { Link }                        from 'react-router'

import styles from './numbers-summary.css'

const d = debug('keik:gh:components:repository:partial:numbers-summary')

export default class NumbersSummary extends Component {

  static propTypes = {
    branches: PropTypes.array.isRequired,
    commits: PropTypes.array.isRequired,
    params: PropTypes.shape({
      owner: PropTypes.string.isRequired,
      repo: PropTypes.string.isRequired,
      tree: PropTypes.string,
      splat: PropTypes.string,
    }).isRequired,
    tags: PropTypes.array.isRequired,
  }

  render = () => {
    d('render')
    const { params: { owner, repo }, branches, commits, tags } = this.props
    return (
      <ul className={styles.container}>
        <li>
          <Link to={`/${owner}/${repo}/commits`}>
            <i className="fa fa-clock-o" />
            <span className={styles.emphasized}>{commits.length}</span> commits
          </Link>
        </li>
        <li>
          <Link to={`/${owner}/${repo}/branches`}>
            <i className="fa fa-code-fork" />
            <span className={styles.emphasized}>{branches.length}</span> branches
          </Link>
        </li>
        <li>
          <Link to={`/${owner}/${repo}/releases`}>
            <i className="fa fa-tag" />
            <span className={styles.emphasized}>{tags.length}</span> releases
          </Link>
        </li>
        <li>
          <Link to={`/${owner}/${repo}/graphs/contributors`}>
            <i className="fa fa-users" />
            <span className={styles.emphasized}>{this.props.contributorsCount}</span> contributors
          </Link>
        </li>
      </ul>
    )
  }
}
