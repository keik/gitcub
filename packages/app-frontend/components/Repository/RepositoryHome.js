// @flow

import type { Tree$Entry$WithLastCommitT } from '@gitcub/types/gh'
import type { BranchObj, CommitObj, TagObj } from '@gitcub/types/nodegit'
import { Button } from '@gitcub/ui'
import * as React from 'react'
import { connect } from 'react-redux'
import { Link, type Match } from 'react-router-dom'
import { css } from 'styled-components'

import config from '../../../../config'
import rootReducer from '../../ducks'
import * as BranchesAction from '../../ducks/repository/branches'
import * as CommitsAction from '../../ducks/repository/commits'
import * as TagsAction from '../../ducks/repository/tags'
import * as TreesAction from '../../ducks/repository/trees'
import Dropdown from '../common/blocks/Dropdown'
import SegmentedButtonsContainer from '../common/layouts/SegmentedButtonsContainer'
import Entries from './shared/Entries'
import TreeSelector from './shared/TreeSelector'

const { HOST, PORT } = config.env[process.env.NODE_ENV || 'development']

type Props = {|
  branches: $ReadOnlyArray<BranchObj>,
  commits: $ReadOnlyArray<CommitObj>,
  contributorsCount: number,
  entries: $ReadOnlyArray<Tree$Entry$WithLastCommitT>,
  match: $Shape<
    Match<{
      owner: string,
      repo: string,
      tree?: string,
      path?: string
    }>
  >,
  tags: $ReadOnlyArray<TagObj>
|}

const RepositoryHome = ({ branches, commits, entries, match, tags }: Props) => (
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
      <NumbersSummary
        branchesCount={branches.length}
        commitsCount={commits.length}
        contributorsCount={-1}
        match={match}
        tagsCount={tags.length}
      />
    </nav>
    <div
      css={css`
        display: flex;
        margin: 12px 0;
        justify-content: space-between;
      `}
    >
      <div>
        <TreeSelector branches={branches} tags={tags} params={match.params} />
        <Button
          as="a"
          css={css`
            margin-left: 8px;
          `}
          href={`${match.params.owner}/${match.params.repo}/pull/new/${
            match.params.tree || '' /* TODO: default branch */
          }`}
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
          <Button
            as="a"
            href={`${match.params.owner}/${match.params.repo}/upload/${
              match.params.tree || '' /* TODO: default branch */
            }`}
            small
          >
            Upload files
          </Button>
          <Button
            as="a"
            href={`${match.params.owner}/${match.params.repo}/find/${
              match.params.tree || '' /* TODO: default branch */
            }`}
            small
          >
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
                    value={`http:///${HOST}:${PORT}/${match.params.owner}/${match.params.repo}.git`}
                  />
                </div>
              </li>
            </ul>
          </Dropdown>
        </div>
      </div>
    </div>
    <Entries entries={entries} params={match.params} />
  </div>
)

export default RepositoryHome

export const RepositoryHomeContainer = connect<_, _, *, _, *, _>(
  ({ branches, commits, tags, trees }: $Call<typeof rootReducer>) => ({
    branches,
    commits,
    tags,
    entries: trees
  })
)(
  class $RepositoryHomeContainer extends React.Component<*> {
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
      return (
        <RepositoryHome
          branches={this.props.branches}
          commits={this.props.commits}
          contributorsCount={-1}
          entries={this.props.entries}
          match={this.props.match}
          tags={this.props.tags}
        />
      )
    }
  }
)

const NumbersSummary = ({
  branchesCount,
  commitsCount,
  contributorsCount,
  match: { params },
  tagsCount
}: {|
  branchesCount: number,
  commitsCount: number,
  contributorsCount: number,
  match: $Shape<
    Match<{
      owner: string,
      repo: string,
      tree?: string,
      path?: string
    }>
  >,
  tagsCount: number
|}) => (
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
        <span>{commitsCount}</span> commits
      </Link>
    </li>
    <li>
      <Link to={`/${params.owner}/${params.repo}/branches`}>
        <i className="fa fa-code-fork" />
        <span>{branchesCount}</span> branches
      </Link>
    </li>
    <li>
      <Link to={`/${params.owner}/${params.repo}/releases`}>
        <i className="fa fa-tag" />
        <span>{tagsCount}</span> releases
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
