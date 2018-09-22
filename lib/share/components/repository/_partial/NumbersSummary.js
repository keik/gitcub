// @flow

import React from 'react'
import { Link } from 'react-router'

import styles from './NumbersSummary.css'

import type {
  BranchObj,
  CommitObj,
  ParentObj,
  TagObj
} from '../../../../types/nodegit'

export default function NumbersSummary({
  branches,
  commits,
  contributorsCount,
  params,
  tags
}: {
  branches: Array<BranchObj>,
  commits: Array<{
    commit: CommitObj,
    parents: Array<ParentObj>,
    sha: string,
    url: string
  }>,
  contributorsCount: number,
  params: {
    owner: string,
    repo: string,
    tree: string,
    splat: string
  },
  tags: Array<TagObj>
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
