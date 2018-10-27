// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import type { Dispatch } from 'redux'

import styles from './Tree.css'
import Breadcrumbs from './Tree/Breadcrumbs'
import Entries from './shared/Entries'
import TreeSelector from './shared/TreeSelector'
import InnerContainer from '../common/layouts/InnerContainer'
import type { ReducersStateT } from '../../ducks'
import * as BranchesAction from '../../ducks/repository/branches'
import * as CommitsAction from '../../ducks/repository/commits'
import * as TagsAction from '../../ducks/repository/tags'
import * as TreesAction from '../../ducks/repository/trees'

export const RepoTree = props => (
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

export default connect(
  ({ branches, commits, tags, trees }: ReducersStateT) => ({
    branches,
    commits,
    tags,
    entries: trees
  })
)(
  class RepoTreeContainer extends React.Component<{
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
      return <RepoTree {...this.props} />
    }
  }
)
