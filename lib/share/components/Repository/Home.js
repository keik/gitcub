// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import type { Dispatch } from 'redux'
import styled from 'styled-components'

import Button from '../common/atoms/Button'
import Dropdown from '../common/blocks/Dropdown'
import InnerContainer from '../common/layouts/InnerContainer'
import SegmentedButtonsContainer from '../common/layouts/SegmentedButtonsContainer'
import Entries from './shared/Entries'
import NumbersSummary from './Home/NumbersSummary'
import TreeSelector from './shared/TreeSelector'
import * as BranchesAction from '../../ducks/repository/branches'
import * as CommitsAction from '../../ducks/repository/commits'
import * as TagsAction from '../../ducks/repository/tags'
import * as TreesAction from '../../ducks/repository/trees'
import config from '../../../../config'
import type { ReducersStateT } from '../../ducks'

const { HOST, PORT } = config.env[process.env.NODE_ENV || 'development']

export const Home = styled(
  (props: {
    branches: $PropertyType<ReducersStateT, 'branches'>,
    className: string,
    commits: $PropertyType<ReducersStateT, 'commits'>,
    contributorsCount: number,
    entries: $PropertyType<ReducersStateT, 'trees'>,
    params: {
      owner: string,
      repo: string,
      tree: string,
      splat: string
    },
    tags: $PropertyType<ReducersStateT, 'tags'>
  }) => {
    const {
      params: { owner, repo, tree = 'master' }
    } = props
    return (
      <InnerContainer className={props.className}>
        <div className="metaContent">
          <span>No description or website provided.</span>
          <span>
            - <button>Edit</button>
          </span>
        </div>
        <nav>
          <NumbersSummary {...props} />
        </nav>
        <div className="fileNavigation">
          <div className="treeSelector">
            <TreeSelector {...props} />
          </div>
          <Button as="a" small href={`${owner}/${repo}/pull/new/${tree}`}>
            New pull request
          </Button>
          <div className="floatRight" style={{ marginRight: 0 }}>
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
                  <div className="cloneModal">
                    <h2>Clone with HTTP</h2>
                    <p>Use Git using the web URL.</p>
                    <input
                      className="cloneUri"
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
          <div className="floatRight">
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
        <Entries {...props} />
      </InnerContainer>
    )
  }
)`
  .metaContent {
    font-size: 16px;
    color: #666;
  }

  .fileNavigation {
    margin-top: 12px;
  }
  .fileNavigation > * {
    margin-right: 12px;
  }
  .fileNavigation:after {
    content: '';
    display: table;
    clear: both;
  }

  .treeSelector {
    float: left;
  }

  .floatRight {
    float: right;
  }

  .inline {
    display: inline-block;
  }

  .commitTease {
    padding: 10px;
    margin: 12px 0 0 0;
    color: #68777d;
    background-color: #f2f9fc;
    border: 1px solid #c9e6f2;
    border-radius: 3px 3px 0 0;
  }

  .cloneModal {
    padding: 12px;
  }
  .cloneModal h2 {
    margin: 0;
    font-size: 16px;
  }
  .cloneModal p {
    margin: 4px 0;
    font-size: 12px;
  }

  .cloneUri {
    font-size: 12px;
    font-family: Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  }
`

export default connect(
  ({ branches, commits, tags, trees }: ReducersStateT) => ({
    branches,
    commits,
    tags,
    entries: trees
  })
)(
  class HomeContainer extends React.Component<{
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
      return <Home {...this.props} />
    }
  }
)
