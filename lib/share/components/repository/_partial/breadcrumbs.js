import debug from 'debug'
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import styles from './breadcrumbs.css'

const d = debug('keik:gh:components:repository:partial:breadcrumbs')

export default class Breadcrumbs extends Component {
  static propTypes = {
    params: PropTypes.shape({
      owner: PropTypes.string.isRequired,
      repo: PropTypes.string.isRequired,
      tree: PropTypes.string,
      splat: PropTypes.string,
    }).isRequired,
  }

  render = () => {
    d(`render`)
    const { params: { owner, repo, tree='master', splat } } = this.props
    const path = splat.replace(/^\//, '')
    return (
      <div className={styles.container}>
        {path.split('/').reduce((acc, dir, i, dirs) => {
           if (i === dirs.length - 1) {
             acc.push(
               <strong key={dir}>{dir}</strong>
             )
           } else {
             acc.push(
               <Link
                 key={dir}
                 to={`/${owner}/${repo}/tree/${tree}/${Object.assign([], dirs).splice(0, i + 1).join('/')}`}>{dir}</Link>
             )
           }
           acc.push(
             <span
               className={styles.separator}
               key={`${dir}/`}
             >/</span>
           )
           return acc
         }, [
           <Link
             className={styles.repoRoot}
             key={repo}
             to={`/${owner}/${repo}/tree/${tree}`}>{repo}</Link>,
           <span
             className={styles.separator}
             key={`${repo}/`}
           >/</span>
         ])}
      </div>
    )
  }
}
