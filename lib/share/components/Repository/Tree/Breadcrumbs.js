// @flow

import React from 'react'
import { Link } from 'react-router'

import styles from './Breadcrumbs.css'

export default function Breadcrumbs({
  params
}: {
  params: {
    owner: string,
    repo: string,
    tree: string,
    splat: string
  }
}) {
  const { owner, repo, tree = 'master', splat = '' } = params
  const path = splat.replace(/^\//, '')
  return (
    <div className={styles.container}>
      <Link
        className={styles.repoRoot}
        key={repo}
        to={`/${owner}/${repo}/tree/${tree}`}
      >
        {repo}
      </Link>
      <span className={styles.separator} key={`${repo}/`}>
        /
      </span>
      {path.split('/').map((dir, i, dirs) => (
        <React.Fragment key={i}>
          {i === dirs.length - 1 ? (
            <strong key={dir}>{dir}</strong>
          ) : (
            <Link
              key={dir}
              to={`/${owner}/${repo}/tree/${tree}/${[...dirs]
                .splice(0, i + 1)
                .join('/')}`}
            >
              {dir}
            </Link>
          )}
          <span className={styles.separator} key={`${dir}/`}>
            /
          </span>
        </React.Fragment>
      ))}
    </div>
  )
}
