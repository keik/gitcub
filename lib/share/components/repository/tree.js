// @flow

import React from 'react'

import styles from './tree.css'
import Breadcrumbs from './_partial/breadcrumbs'
import Entries from './_partial/entries'
import TreeSelector from './_partial/tree-selector'

import type { BranchObj, TagObj, TreeEntryObj } from '../../../types/nodegit'

export default function RepoTree(props: {
  branches: Array<BranchObj>,
  entries: Array<TreeEntryObj>,
  params: {
    owner: string,
    repo: string,
    tree: string,
    splat: string
  },
  tags: Array<TagObj>
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
