// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import type { Dispatch } from 'redux'

import { Entries } from './shared/Entries'
import TreeSelector from './shared/TreeSelector'
import type { ReducersStateT } from '../../ducks'
import * as BranchesAction from '../../ducks/repository/branches'
import * as CommitsAction from '../../ducks/repository/commits'
import * as TagsAction from '../../ducks/repository/tags'
import * as TreesAction from '../../ducks/repository/trees'

export const Tree = (props: {
  branches: $PropertyType<ReducersStateT, 'branches'>,
  entries: $PropertyType<ReducersStateT, 'trees'>,
  params: {
    owner: string,
    repo: string,
    tree: string,
    splat: string
  },
  tags: $PropertyType<ReducersStateT, 'tags'>
}) => (
  <div>
    <div
      style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}
    >
      <div style={{ marginRight: '12px' }}>
        <TreeSelector {...props} />
      </div>
      <Breadcrumbs {...props} />
    </div>
    <Entries {...props} />
  </div>
)

export default connect<_, _, *, _, *, _>(
  ({ branches, commits, tags, trees }: ReducersStateT) => ({
    branches,
    commits,
    tags,
    entries: trees
  })
)(
  class TreeContainer extends React.Component<{
    branches: $PropertyType<ReducersStateT, 'branches'>,
    dispatch: Dispatch<*>,
    entries: $PropertyType<ReducersStateT, 'trees'>,
    params: {
      owner: string,
      repo: string,
      tree: string,
      splat: string
    },
    tags: $PropertyType<ReducersStateT, 'tags'>
  }> {
    async componentDidMount() {
      const {
        dispatch,
        params: { owner, repo, tree }
      } = this.props
      // TODO parallel
      dispatch(await BranchesAction.fetch({ owner, repo }))
      dispatch(await CommitsAction.fetch({ owner, repo, tree }))
      dispatch(await TagsAction.fetch({ owner, repo }))
      dispatch(await TreesAction.fetch({ owner, repo, tree }))
    }

    render() {
      return <Tree {...this.props} />
    }
  }
)

export const Breadcrumbs = ({
  params
}: {
  params: {
    owner: string,
    repo: string,
    tree: string,
    splat: string
  }
}) => {
  const { owner, repo, tree = 'master', splat = '' } = params
  const path = splat.replace(/^\//, '')
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
