// @flow

import React from 'react'
import { Link } from 'react-router'

import styles from './numbers-summary.css'

export default function NumbersSummary({
  branches,
  commits,
  contributorsCount,
  params,
  tags
}: {
  branches: Array<Branch>,
  commits: Array<Commit>,
  contributorsCount: number,
  params: {
    owner: string,
    repo: string,
    tree: string,
    splat: string
  },
  tags: Array<Tag>
}) {
  const { owner, repo } = params
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
          <span className={styles.emphasized}>{contributorsCount}</span>{' '}
          contributors
        </Link>
      </li>
    </ul>
  )
}
