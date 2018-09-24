// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import type { Dispatch } from 'redux'
import styled from 'styled-components'

import type { ReducersStateT } from '../ducks'
import * as RepositoriesAction from '../ducks/repository'
import panelStyles from '../styles/panel.css'
import InnerContainer from '../components/common/layouts/InnerContainer'
import List from '../components/common/layouts/List'

export class Home extends React.Component<{
  dispatch: Dispatch<*>,
  repositories: Array<*>
}> {
  async componentDidMount() {
    const { dispatch } = this.props
    dispatch(await RepositoriesAction.fetch())
  }

  render() {
    const { repositories } = this.props
    return (
      <$Container>
        <div className="main">
          <List lined>
            <li>ACTIVITY_1</li>
            <li>ACTIVITY_2</li>
            <li>ACTIVITY_3</li>
          </List>
        </div>
        <div className="side">
          <div className={panelStyles.panel}>
            <div className={panelStyles.defaultPanelHeader}>
              Public Repositories
            </div>
            <List lined>
              {repositories.map((repo, i) => (
                <li key={i}>
                  <i className="fa fa-folder-open-o" />
                  &nbsp;
                  <a href={`/${repo.full_name}`}>{repo.full_name}</a>
                </li>
              ))}
            </List>
          </div>
        </div>
      </$Container>
    )
  }
}

const $Container = styled(InnerContainer)`
  display: flex;
  .main {
    flex-grow: 1;
  }
  .side {
    width: 320px;
    margin-left: 24px;
  }
`

export default connect(({ repository }: ReducersStateT) => ({
  repositories: repository.repositories
}))(Home)
