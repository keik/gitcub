import debug from 'debug'
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import styles from './breadcrumbs.css'

const d = debug('keik:gh:components:repository:partial:breadcrumbs')

export default class Breadcrumbs extends Component {
  static propTypes = {
    branches: PropTypes.arrayOf(PropTypes.string).isRequired,
    entries: PropTypes.arrayOf(PropTypes.shape({
      lastCommit: PropTypes.shape({
        date: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
      }),
    })).isRequired,
    params: PropTypes.shape({
      owner: PropTypes.string.isRequired,
      repo: PropTypes.string.isRequired,
      tree: PropTypes.string,
      splat: PropTypes.string,
    }).isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  render = () => {
    d(`render`)
    const { params: { owner, repo, tree='master', splat } } = this.props
    const path = splat.replace(/^\//, '')
    return (
      <div className={styles.container}>
        {path.split('/').map(p => (
           <span key={p}>
             <Link to={`/${owner}/${repo}/tree/${tree}/${path}`}>{p}</Link>
             <span>/</span>
           </span>
         ))}
      </div>
    )
  }
}
