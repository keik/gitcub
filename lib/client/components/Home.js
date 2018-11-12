// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import type { Dispatch } from 'redux'

import type { RepositoryT } from '../../types/gh'
import type { ReducersStateT } from '../ducks'
import * as RepositoriesAction from '../ducks/repositories'
import InnerContainer from '../components/common/layouts/InnerContainer'
import List from '../components/common/layouts/List'
import Panel from '../components/common/blocks/Panel'

export class HomeContainer extends React.Component<{
  dispatch: Dispatch<*>,
  repositories: Array<RepositoryT>
}> {
  async componentDidMount() {
    const { dispatch } = this.props
    dispatch(await RepositoriesAction.fetch())
  }

  render() {
    const { repositories } = this.props
    return <Home repositories={repositories} />
  }
}

export default connect<_, _, *, _, *, _>(
  ({ repositories }: ReducersStateT) => ({
    repositories: repositories.repositories
  })
)(HomeContainer)

export const Home = ({
  repositories
}: {
  repositories: Array<RepositoryT>
}) => (
  <InnerContainer>
    <div
      style={{
        display: 'flex',
        marginTop: '24px'
      }}
    >
      <div style={{ flexGrow: 1 }}>
        <List lined>
          <li>ACTIVITY_1</li>
          <li>ACTIVITY_2</li>
          <li>ACTIVITY_3</li>
        </List>
      </div>
      <div
        style={{
          width: '320px',
          marginLeft: '24px'
        }}
      >
        <Panel>
          <Panel.Header>Public Repositories</Panel.Header>
          <Panel.Body noPadding>
            <List lined withLRPadding>
              {repositories.map((repo, i) => (
                <li key={i}>
                  <i className="fa fa-folder-open-o" />
                  &nbsp;
                  <a href={`/${repo.full_name}`}>{repo.full_name}</a>
                </li>
              ))}
            </List>
          </Panel.Body>
        </Panel>
      </div>
    </div>
  </InnerContainer>
)
