// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import type { Dispatch } from 'redux'

import Panel from '../common/blocks/Panel'
import styles from './Branches.css'
import InnerContainer from '../common/layouts/InnerContainer'
import * as BranchesAction from '../../ducks/repository/branches'
import type { BranchT } from '../../../types/gh'

export class RepoBranches extends React.Component<{
  branches: Array<BranchT>,
  defaultBranchName: string,
  dispatch: Dispatch<*>,
  params: { owner: string, repo: string }
}> {
  async componentDidMount() {
    const {
      dispatch,
      params: { owner, repo }
    } = this.props
    dispatch(await BranchesAction.fetch({ owner, repo }))
  }

  render() {
    const { branches, defaultBranchName, params } = this.props
    const { owner, repo } = params
    const defaultBranch: BranchT = branches.find(
      branch => branch.name === defaultBranchName
    ) || {
      commit: { author: { date: '', name: '' }, message: '', sha: '' },
      name: ''
    }
    const activeBranches = branches.filter(
      branch => branch.name !== defaultBranchName
    )
    return (
      <InnerContainer>
        <Panel>
          <Panel.Header>Default branch</Panel.Header>
          <Panel.Body>
            <ul className={styles.branches}>
              <li>
                <a href={`/${owner}/${repo}/tree/${defaultBranch.name}`}>
                  {defaultBranch.name}
                </a>
                &nbsp; Updated{' '}
                <time-ago datetime={defaultBranch.commit.author.date} />{' '}
                by&nbsp;
                <a href={`/${defaultBranch.commit.author.name}`}>
                  {defaultBranch.commit.author.name}
                </a>
              </li>
            </ul>
          </Panel.Body>
        </Panel>
        <Panel>
          <Panel.Header>Active branches</Panel.Header>
          <Panel.Body>
            <ul className={styles.branches}>
              {activeBranches.map((branch, i) => (
                <li key={i}>
                  <a href={`/${owner}/${repo}/tree/${branch.name}`}>
                    {branch.name}
                  </a>
                  &nbsp; Updated{' '}
                  <time-ago datetime={branch.commit.author.date} /> by&nbsp;
                  <a href={`/${branch.commit.author.name}`}>
                    {branch.commit.author.name}
                  </a>
                </li>
              ))}
            </ul>
          </Panel.Body>
        </Panel>
      </InnerContainer>
    )
  }
}

export default connect(({ branches }) => ({
  branches
}))(RepoBranches)
