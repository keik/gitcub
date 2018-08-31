// @flow

import React from 'react'

import styles from './branches.css'
import panelStyles from '../../styles/panel.css'

import type { BranchObj } from '../../../types/nodegit'

export default function RepoBranches({
  branches,
  defaultBranchName,
  params
}: {
  branches: Array<BranchObj>,
  defaultBranchName: string,
  params: { owner: string, repo: string }
}) {
  const { owner, repo } = params
  const defaultBranch: BranchObj = branches.find(
    branch => branch.name === defaultBranchName
  ) || {
    commit: { author: { date: '', name: '' }, message: '', sha: '' },
    name: ''
  }
  const activeBranches = branches.filter(
    branch => branch.name !== defaultBranchName
  )
  return (
    <div className={styles.container}>
      <div className={panelStyles.panel}>
        <div className={panelStyles.defaultPanelHeader}>Default branch</div>
        <ul className={styles.branches}>
          <li>
            <a href={`/${owner}/${repo}/tree/${defaultBranch.name}`}>
              {defaultBranch.name}
            </a>
            &nbsp; Updated{' '}
            <time-ago datetime={defaultBranch.commit.author.date} /> by&nbsp;
            <a href={`/${defaultBranch.commit.author.name}`}>
              {defaultBranch.commit.author.name}
            </a>
          </li>
        </ul>
      </div>
      <div className={panelStyles.panel}>
        <div className={panelStyles.defaultPanelHeader}>Active branches</div>
        <ul className={styles.branches}>
          {activeBranches.map((branch, i) => (
            <li key={i}>
              <a href={`/${owner}/${repo}/tree/${branch.name}`}>
                {branch.name}
              </a>
              &nbsp; Updated <time-ago datetime={branch.commit.author.date} />{' '}
              by&nbsp;
              <a href={`/${branch.commit.author.name}`}>
                {branch.commit.author.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
