// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import { type Match } from 'react-router-dom'
import type { Dispatch } from 'redux'

import Panel from '../common/blocks/Panel'
import List from '../common/layouts/List'
import type { ReducersStateT } from '../../ducks'
import * as BranchesAction from '../../ducks/repository/branches'
import type { BranchT } from '../../../types/gh'

type Props = {
  branches: Array<BranchT>,
  defaultBranchName: string,
  dispatch: Dispatch<*>,
  match: $Shape<Match<{ owner: string, repo: string }>>
}
export default connect<_, ReducersStateT, *, _, *, _>(({ branches }) => ({
  branches
}))(
  class BranchesContainer extends React.Component<Props> {
    async componentDidMount() {
      const {
        dispatch,
        match: {
          params: { owner, repo }
        }
      } = this.props
      dispatch(await BranchesAction.fetch({ owner, repo }))
    }

    render() {
      return <Branches {...this.props} />
    }
  }
)

export const Branches = ({ branches, defaultBranchName, match }: *) => {
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
    <div>
      <Panel>
        <Panel.Header>Default branch</Panel.Header>
        <Panel.Body>
          <List lined>
            <li>
              <a
                href={`/${match.params.owner}/${match.params.repo}/tree/${
                  defaultBranch.name
                }`}
              >
                {defaultBranch.name}
              </a>
              &nbsp; Updated{' '}
              <time-ago datetime={defaultBranch.commit.author.date} /> by&nbsp;
              <a href={`/${defaultBranch.commit.author.name}`}>
                {defaultBranch.commit.author.name}
              </a>
            </li>
          </List>
        </Panel.Body>
      </Panel>
      <Panel>
        <Panel.Header>Active branches</Panel.Header>
        <Panel.Body>
          <List lined>
            {activeBranches.map((branch, i) => (
              <li key={i}>
                <a
                  href={`/${match.params.owner}/${match.params.repo}/tree/${
                    branch.name
                  }`}
                >
                  {branch.name}
                </a>
                &nbsp; Updated <time-ago datetime={branch.commit.author.date} />{' '}
                by&nbsp;
                <a href={`/${branch.commit.author.name}`}>
                  {branch.commit.author.name}
                </a>
              </li>
            ))}
          </List>
        </Panel.Body>
      </Panel>
    </div>
  )
}
