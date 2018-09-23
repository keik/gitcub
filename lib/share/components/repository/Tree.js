// @flow

import React from 'react'

import styles from './Tree.css'
import Breadcrumbs from './_partial/Breadcrumbs'
import Entries from './_partial/Entries'
import TreeSelector from './_partial/TreeSelector'
import InnerContainer from '../common/layouts/InnerContainer'

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
    <InnerContainer>
      <div className={styles.fileNavigation}>
        <div className={styles.treeSelector}>
          <TreeSelector {...props} />
        </div>
        <div className={styles.breadcrumbs}>
          <Breadcrumbs {...props} />
        </div>
      </div>
      <Entries {...props} />
    </InnerContainer>
  )
}
