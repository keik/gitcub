// @flow

import type { Tree$Entry$WithLastCommitT } from '@gitcub/types/gh'
import type { BranchObj, TagObj } from '@gitcub/types/nodegit'
import * as React from 'react'
import { connect } from 'react-redux'
import { Link, type Match } from 'react-router-dom'
import type { Dispatch } from 'redux'

import rootReducer from '../../ducks'
import * as BranchesAction from '../../ducks/repository/branches'
import * as CommitsAction from '../../ducks/repository/commits'
import * as TagsAction from '../../ducks/repository/tags'
import * as TreesAction from '../../ducks/repository/trees'
import Entries from './shared/Entries'
import TreeSelector from './shared/TreeSelector'

type Props = {|
  branches: $ReadOnlyArray<BranchObj>,
  entries: $ReadOnlyArray<Tree$Entry$WithLastCommitT>,
  match: $Shape<
    Match<{
      owner: string,
      repo: string,
      tree: string,
      path?: string
    }>
  >,
  tags: $ReadOnlyArray<TagObj>
|}

const RepositoryTree = (props: Props) => (
  <div>
    <div
      style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}
    >
      <div style={{ marginRight: '12px' }}>
        <TreeSelector
          branches={props.branches}
          params={{ ...props.match.params }}
          tags={props.tags}
        />
      </div>
      <Breadcrumbs {...props} />
    </div>
    <Entries entries={props.entries} params={{ ...props.match.params }} />
  </div>
)

export default RepositoryTree

export const RepositoryTreeContainer = connect<_, _, *, _, *, _>(
  ({ branches, commits, tags, trees }: $Call<typeof rootReducer>) => ({
    branches,
    commits,
    tags,
    entries: trees
  })
)(
  class $RepositoryTreeContainer extends React.Component<{|
    ...Props,
    dispatch: Dispatch<*>
  |}> {
    async componentDidMount() {
      const {
        dispatch,
        match: {
          params: { owner, repo, tree }
        }
      } = this.props
      // TODO parallel
      dispatch(await BranchesAction.fetch({ owner, repo }))
      dispatch(await CommitsAction.fetch({ owner, repo, tree }))
      dispatch(await TagsAction.fetch({ owner, repo }))
      dispatch(await TreesAction.fetch({ owner, repo, tree: tree || '' }))
    }

    render() {
      return (
        <RepositoryTree
          branches={this.props.branches}
          entries={this.props.entries}
          match={this.props.match}
          tags={this.props.tags}
        />
      )
    }
  }
)

export const Breadcrumbs = ({ match: { params } }: *) => {
  const { owner, repo, tree = 'master' } = params
  const path = (params.path || '').replace(/^\//, '')
  return (
    <div>
      <strong>
        <Link key={repo} to={`/${owner}/${repo}/tree/${tree}`}>
          {repo}
        </Link>
      </strong>
      <span key={`${repo}/`} style={{ margin: '0 6px' }}>
        /
      </span>
      {path.split('/').map((dir, i, dirs) => (
        <React.Fragment key={i}>
          {i === dirs.length - 1 ? (
            <strong key={dir}>{dir}</strong>
          ) : (
            <Link
              key={dir}
              to={`/${owner}/${repo}/tree/${tree}/${[...dirs]
                .splice(0, i + 1)
                .join('/')}`}
            >
              {dir}
            </Link>
          )}
          <span key={`${dir}/`} style={{ margin: '0 6px' }}>
            /
          </span>
        </React.Fragment>
      ))}
    </div>
  )
}
