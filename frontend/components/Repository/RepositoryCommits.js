// @flow

import * as React from 'react'
import { css } from 'styled-components'
import { connect } from 'react-redux'
import { Link, type Match } from 'react-router-dom'
import type { Dispatch } from 'redux'

import Button from '../common/atoms/Button'
import SegmentedButtonsContainer from '../common/layouts/SegmentedButtonsContainer'
import type { ReducersStateT } from '../../ducks'
import * as CommitsAction from '../../ducks/repository/commits'
import type { CommitT } from '../../../types/gh'

type Props = {
  commits: Array<CommitT>,
  match: $Shape<
    Match<{
      owner: string,
      repo: string
    }>
  >
}
export const RepositoryCommits = ({ commits, match }: Props) => (
  <ul
    css={css`
      padding: 0;
      margin: 0;
      list-style: none;
      border-right: 1px solid #eee;
      border-bottom: 1px solid #eee;
      border-left: 1px solid #eee;
    `}
  >
    {commits.map(commit => (
      <li
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px;
          border-top: 1px solid #eee;
        `}
        key={commit.sha}
      >
        <div
          css={css`
            display: flex;
          `}
        >
          <div>
            <div
              css={css`
                font-size: 15px;
                font-weight: bold;
                color: #333;
              `}
            >
              {commit.commit.message}
            </div>
            <div
              css={css`
                font-weight: normal;
                color: #767676;
              `}
            >
              <Link to={`/${commit.commit.author.name}}`}>
                <img alt="" src="" />
              </Link>
              {commit.commit.author.name} commited on{' '}
              <time-ago datetime={commit.commit.author.date} />
            </div>
          </div>
        </div>
        <div
          css={css`
            display: flex;
          `}
        >
          <SegmentedButtonsContainer>
            <Button small transparent>
              <i className="fa fa-clipboard" />
            </Button>
            <Button
              as={Link}
              // $FlowFixMe
              small="true"
              to={`/${match.params.owner}/${match.params.repo}/commit/${
                commit.sha
              }`}
              // $FlowFixMe
              transparent="true"
            >
              {commit.sha.substring(0, 7)}
            </Button>
          </SegmentedButtonsContainer>
          <Button
            as={Link}
            // $FlowFixMe
            small="true"
            style={{ marginLeft: '12px' }}
            to={`/${match.params.owner}/${match.params.repo}/tree/${
              commit.sha
            }`}
            // $FlowFixMe
            transparent="true"
          >
            <i className="fa fa-code" />
          </Button>
        </div>
      </li>
    ))}
  </ul>
)

export default RepositoryCommits

export const RepositoryCommitsContainer = connect<_, _, *, _, *, _>(
  ({ commits }: ReducersStateT) => ({
    commits
  })
)(
  class $RepositoryCommitsContainer extends React.Component<
    Props & { dispatch: Dispatch<*> }
  > {
    async componentDidMount() {
      const {
        dispatch,
        match: {
          params: { owner, repo }
        }
      } = this.props
      dispatch(await CommitsAction.fetch({ owner, repo }))
    }

    render() {
      return <RepositoryCommits {...this.props} />
    }
  }
)
