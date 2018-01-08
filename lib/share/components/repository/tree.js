// @flow

import React from 'react'

import styles from './tree.css'
import Breadcrumbs from './_partial/breadcrumbs'
import Entries from './_partial/entries'
import TreeSelector from './_partial/tree-selector'

import type { Branch, Commit, Tag } from '../../../types/nodegit'

export default function RepoTree(props: {
  branches: Array<Branch>,
  entries: Array<{
    lastCommit: Commit
  }>,
  params: {
    owner: string,
    repo: string,
    tree: string,
    splat: string
  },
  tags: Array<Tag>
}) {
  return (
    <div className={styles.container}>
      <div className={styles.fileNavigation}>
        <div className={styles.treeSelector}>
          <TreeSelector {...props} />
        </div>
        <div className={styles.breadcrumbs}>
          <Breadcrumbs {...props} />
        </div>
      </div>
      <Entries {...props} />
    </div>
  )
}
