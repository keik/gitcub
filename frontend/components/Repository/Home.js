// @flow

import * as React from 'react'
import { css } from 'styled-components'
import { connect } from 'react-redux'
import { Link, type Match } from 'react-router-dom'
import type { Dispatch } from 'redux'

import Button from '../common/atoms/Button'
import Dropdown from '../common/blocks/Dropdown'
import SegmentedButtonsContainer from '../common/layouts/SegmentedButtonsContainer'
import Entries from './shared/Entries'
import TreeSelector from './shared/TreeSelector'
import * as BranchesAction from '../../ducks/repository/branches'
import * as CommitsAction from '../../ducks/repository/commits'
import * as TagsAction from '../../ducks/repository/tags'
import * as TreesAction from '../../ducks/repository/trees'
import config from '../../../config'
import type { ReducersStateT } from '../../ducks'
import type {
  BranchObj,
  CommitObj,
  ParentObj,
  TagObj
} from '../../../types/nodegit'

const { HOST, PORT } = config.env[process.env.NODE_ENV || 'development']

type Props = {
  branches: $PropertyType<ReducersStateT, 'branches'>,
  commits: $PropertyType<ReducersStateT, 'commits'>,
  contributorsCount: number,
  entries: $PropertyType<ReducersStateT, 'trees'>,
  match: $Shape<
    Match<{
      owner: string,
      repo: string,
      tree?: string,
      path?: string
    }>
  >,
  tags: $PropertyType<ReducersStateT, 'tags'>
}
export default connect<_, _, *, _, *, _>(
  ({ branches, commits, tags, trees }: ReducersStateT) => ({
    branches,
    commits,
    tags,
    entries: trees
  })
)(
  class HomeContainer extends React.Component<
    Props & { dispatch: Dispatch<*> }
  > {
    async componentDidMount() {
      const {
        dispatch,
        match: {
          params: { owner, repo, tree }
        }
      } = this.props

      Promise.all([
        (async () => dispatch(await BranchesAction.fetch({ owner, repo })))(),
        (async () =>
          dispatch(await CommitsAction.fetch({ owner, repo, tree })))(),
        (async () => dispatch(await TagsAction.fetch({ owner, repo })))(),
        (async () => dispatch(await TreesAction.fetch({ owner, repo, tree })))()
      ])
    }

    render() {
      return <Home {...this.props} />
    }
  }
)

export const Home = (props: Props) => {
  const {
    match: {
      params: { owner, repo, tree = 'master' }
    }
  } = props
  return (
    <div>
      <div
        css={css`
          font-size: 16px;
          color: #666;
        `}
      >
        <span>No description or website provided.</span>
        <span>
          - <button>Edit</button>
        </span>
      </div>
      <nav>
        <NumbersSummary {...props} />
      </nav>
      <div
        css={css`
          display: flex;
          margin: 12px 0;
          justify-content: space-between;
        `}
      >
        <div>
          <TreeSelector {...props} params={{ ...props.match.params }} />
          <Button
            as="a"
            css={css`
              margin-left: 8px;
            `}
            href={`${owner}/${repo}/pull/new/${tree}`}
            small
          >
            New pull request
          </Button>
        </div>
        <div
          css={css`
            display: flex;
          `}
        >
          <SegmentedButtonsContainer>
            <Button as="input" small type="submit" value="Create new file" />
            <Button as="a" href={`${owner}/${repo}/upload/${tree}`} small>
              Upload files
            </Button>
            <Button as="a" href={`${owner}/${repo}/find/${tree}`} small>
              Find file
            </Button>
          </SegmentedButtonsContainer>
          <div
            css={css`
              margin-left: 8px;
            `}
          >
            <Dropdown
              toggler={
                <Button primary small>
                  Clone or download <i className="fa fa-caret-down" />
                </Button>
              }
              width={300}
            >
              <ul>
                <li>
                  <div
                    css={css`
                      padding: 12px;
                      > h2 {
                        margin: 0;
                        font-size: 16px;
                      }
                      > p {
                        margin: 4px 0;
                        font-size: 12px;
                      }
                    `}
                  >
                    <h2>Clone with HTTP</h2>
                    <p>Use Git using the web URL.</p>
                    <input
                      css={css`
                        font-size: 12px;
                        font-family: SFMono-Regular, Consolas, Liberation Mono,
                          Menlo, Courier, monospace;
                      `}
                      onClick={e => e.target.select()}
                      readOnly
                      type="text"
                      value={`http:///${HOST}:${PORT}/${owner}/${repo}.git`}
                    />
                  </div>
                </li>
              </ul>
            </Dropdown>
          </div>
        </div>
      </div>
      <Entries {...props} params={{ ...props.match.params }} />
    </div>
  )
}

const NumbersSummary = ({
  branches,
  commits,
  contributorsCount,
  match: { params },
  tags
}: {
  branches: Array<BranchObj>,
  // $FlowFixMe
  commits: Array<{
    commit: CommitObj,
    parents: Array<ParentObj>,
    sha: string,
    url: string
  }>,
  contributorsCount: number,
  match: $Shape<
    Match<{
      owner: string,
      repo: string,
      tree?: string,
      path?: string
    }>
  >,
  tags: Array<TagObj>
}) => (
  <ul
    css={css`
      display: flex;
      justify-content: space-around;
      border: 1px solid #ccc;
      border-radius: 3px;
      list-style: none;
      padding: 12px;
      margin: 12px 0 0 0;
      a {
        color: #767676;
      }
      .fa {
        margin-right: 4px;
      }
    `}
  >
    <li>
      <Link to={`/${params.owner}/${params.repo}/commits`}>
        <i className="fa fa-clock-o" />
        <span>{commits.length}</span> commits
      </Link>
    </li>
    <li>
      <Link to={`/${params.owner}/${params.repo}/branches`}>
        <i className="fa fa-code-fork" />
        <span>{branches.length}</span> branches
      </Link>
    </li>
    <li>
      <Link to={`/${params.owner}/${params.repo}/releases`}>
        <i className="fa fa-tag" />
        <span>{tags.length}</span> releases
      </Link>
    </li>
    <li>
      <Link to={`/${params.owner}/${params.repo}/graphs/contributors`}>
        <i className="fa fa-users" />
        <span>{contributorsCount}</span> contributors
      </Link>
    </li>
  </ul>
)
