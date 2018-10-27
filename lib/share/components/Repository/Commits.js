// @flow

import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import type { Dispatch } from 'redux'
import styled from 'styled-components'

import Button from '../common/atoms/Button'
import SegmentedButtonsContainer from '../common/layouts/SegmentedButtonsContainer'
import * as CommitsAction from '../../ducks/repository/commits'
import type { CommitT } from '../../../types/gh'

export const Commits = ({
  commits,
  params
}: {
  commits: Array<CommitT>,
  params: {
    owner: string,
    repo: string
  }
}) => {
  return (
    <$CommitItems>
      {commits.map(commit => (
        <$CommitItem key={commit.sha}>
          <$CommitInfo>
            <div>
              <div className="title">{commit.commit.message}</div>
              <div className="meta">
                <Link to={`/${commit.commit.author.name}}`}>
                  <img alt="" src="" />
                </Link>
                {commit.commit.author.name} commited on{' '}
                <time-ago datetime={commit.commit.author.date} />
              </div>
            </div>
          </$CommitInfo>
          <$CommitNav>
            <SegmentedButtonsContainer>
              <Button small transparent>
                <i className="fa fa-clipboard" />
              </Button>
              <Button
                as={Link}
                // $FlowFixMe
                small="true"
                to={`/${params.owner}/${params.repo}/commit/${commit.sha}`}
                // $FlowFixMe
                transparent="true"
              >
                {commit.sha.substring(0, 7)}
              </Button>
            </SegmentedButtonsContainer>
            <Button
              as={Link}
              // $FlowFixMe
              small="true"
              style={{ marginLeft: '12px' }}
              to={`/${params.owner}/${params.repo}/tree/${commit.sha}`}
              // $FlowFixMe
              transparent="true"
            >
              <i className="fa fa-code" />
            </Button>
          </$CommitNav>
        </$CommitItem>
      ))}
    </$CommitItems>
  )
}

export default connect(({ commits }) => ({
  commits
}))(
  class CommitsContainer extends React.Component<{
    commits: Array<CommitT>,
    dispatch: Dispatch<*>,
    params: {
      owner: string,
      repo: string
    }
  }> {
    async componentDidMount() {
      const {
        dispatch,
        params: { owner, repo }
      } = this.props
      dispatch(await CommitsAction.fetch({ owner, repo }))
    }

    render() {
      return <Commits {...this.props} />
    }
  }
)

const $CommitItems = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
  border-left: 1px solid #eee;
`

const $CommitItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border-top: 1px solid #eee;
`

const $CommitInfo = styled.div`
  display: flex;
  .title {
    font-size: 15px;
    font-weight: bold;
    color: #333;
  }
  .meta {
    font-weight: normal;
    color: #767676;
  }
`

const $CommitNav = styled.div`
  display: flex;
`
