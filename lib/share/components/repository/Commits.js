// @flow

import React from 'react'
import { Link } from 'react-router'
import styled from 'styled-components'

import InnerContainer from '../common/layouts/InnerContainer'
import Button from '../common/atoms/Button'
import SegmentedButtonsContainer from '../common/layouts/SegmentedButtonsContainer'

import type { CommitObj, ParentObj } from '../../../types/nodegit'

export default function RepoCommits({
  commits,
  params
}: {
  commits: Array<{
    commit: CommitObj,
    parents: Array<ParentObj>,
    sha: string,
    url: string
  }>,
  params: {
    owner: string,
    repo: string
  }
}) {
  const { owner, repo } = params
  return (
    <InnerContainer>
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
                  to={`/${owner}/${repo}/commit/${commit.sha}`}
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
                to={`/${owner}/${repo}/tree/${commit.sha}`}
                // $FlowFixMe
                transparent="true"
              >
                <i className="fa fa-code" />
              </Button>
            </$CommitNav>
          </$CommitItem>
        ))}
      </$CommitItems>
    </InnerContainer>
  )
}

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
