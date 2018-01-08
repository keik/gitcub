// @flow

import React from 'react'
import { Link } from 'react-router'

import styles from './breadcrumbs.css'

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
      {path.split('/').reduce(
        (acc, dir, i, dirs) => {
          if (i === dirs.length - 1) {
            acc.push(<strong key={dir}>{dir}</strong>)
          } else {
            acc.push(
              <Link
                key={dir}
                to={`/${owner}/${repo}/tree/${tree}/${[...dirs]
                  .splice(0, i + 1)
                  .join('/')}`}
              >
                {dir}
              </Link>
            )
          }
          acc.push(
            <span className={styles.separator} key={`${dir}/`}>
              /
            </span>
          )
          return acc
        },
        [
          <Link
            className={styles.repoRoot}
            key={repo}
            to={`/${owner}/${repo}/tree/${tree}`}
          >
            {repo}
          </Link>,
          <span className={styles.separator} key={`${repo}/`}>
            /
          </span>
        ]
      )}
    </div>
  )
}
