// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import type { Dispatch } from 'redux'

import Button from '../common/atoms/Button'
import Dropdown from '../common/blocks/Dropdown'
import InnerContainer from '../common/layouts/InnerContainer'
import SegmentedButtonsContainer from '../common/layouts/SegmentedButtonsContainer'
import styles from './Home.css'
import Entries from './_partial/Entries'
import NumbersSummary from './_partial/NumbersSummary'
import TreeSelector from './_partial/TreeSelector'
import * as BranchesAction from '../../ducks/repository/branches'
import * as CommitsAction from '../../ducks/repository/commits'
import * as TagsAction from '../../ducks/repository/tags'
import * as TreesAction from '../../ducks/repository/trees'
import config from '../../../../config'
import type { ReducersStateT } from '../../ducks'

const { HOST, PORT } = config.env[process.env.NODE_ENV || 'development']

// eslint-disable-next-line
export class RepoHome extends React.Component<{
  branches: $PropertyType<ReducersStateT, 'branches'>,
  commits: $PropertyType<ReducersStateT, 'commits'>,
  contributorsCount: number,
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
  static defaultProps = {
    branches: [],
    commits: [],
    entries: [],
    tags: []
  }

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
    const {
      params: { owner, repo, tree = 'master' }
    } = this.props
    return (
      <InnerContainer>
        <div className={styles.metaContent}>
          <span>No description or website provided.</span>
          <span>
            - <button>Edit</button>
          </span>
        </div>
        <nav>
          <NumbersSummary {...this.props} />
        </nav>
        <div className={styles.fileNavigation}>
          <div className={styles.treeSelector}>
            <TreeSelector {...this.props} />
          </div>
          <Button as="a" small href={`${owner}/${repo}/pull/new/${tree}`}>
            New pull request
          </Button>
          <div className={`${styles.floatRight}`} style={{ marginRight: 0 }}>
            <Dropdown
              toggler={
                <Button primary small>
                  Clone or download
                </Button>
              }
              width={300}
            >
              <ul>
                <li>
                  <div className={`${styles.cloneModal}`}>
                    <h2>Clone with HTTP</h2>
                    <p>Use Git using the web URL.</p>
                    <input
                      className={styles.cloneUri}
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
          <div className={styles.floatRight}>
            <SegmentedButtonsContainer>
              <Button as="input" small type="submit" value="Create new file" />
              <Button as="a" href={`${owner}/${repo}/upload/${tree}`} small>
                Upload files
              </Button>
              <Button as="a" href={`${owner}/${repo}/find/${tree}`} small>
                Find file
              </Button>
            </SegmentedButtonsContainer>
          </div>
        </div>
        <Entries {...this.props} />
      </InnerContainer>
    )
  }
}

export default connect(
  ({ branches, commits, tags, trees }: ReducersStateT) => ({
    branches,
    commits,
    tags,
    entries: trees
  })
)(RepoHome)
