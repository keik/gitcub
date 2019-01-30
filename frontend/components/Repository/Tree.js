// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import { Link, type Match } from 'react-router-dom'
import type { Dispatch } from 'redux'

import Entries from './shared/Entries'
import TreeSelector from './shared/TreeSelector'
import type { ReducersStateT } from '../../ducks'
import * as BranchesAction from '../../ducks/repository/branches'
import * as CommitsAction from '../../ducks/repository/commits'
import * as TagsAction from '../../ducks/repository/tags'
import * as TreesAction from '../../ducks/repository/trees'

type Props = {
  branches: $PropertyType<ReducersStateT, 'branches'>,
  entries: $PropertyType<ReducersStateT, 'trees'>,
  match: $Shape<
    Match<{
      owner: string,
      repo: string,
      tree: string,
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
  class TreeContainer extends React.Component<
    Props & { dispatch: Dispatch<*> }
  > {
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
      return <Tree {...this.props} />
    }
  }
)

export const Tree = (props: Props) => (
  <div>
    <div
      style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}
    >
      <div style={{ marginRight: '12px' }}>
        <TreeSelector {...props} params={{ ...props.match.params }} />
      </div>
      <Breadcrumbs {...props} />
    </div>
    <Entries {...props} params={{ ...props.match.params }} />
  </div>
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
