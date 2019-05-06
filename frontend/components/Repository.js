// @flow

import * as React from 'react'
import { withRouter, type Match } from 'react-router-dom'

import InnerContainer from './common/layouts/InnerContainer'
import RepositoryHeader from './Repository/RepositoryHeader'
import RepositoryNavigations from './Repository/RepositoryNavigations'

const Repository = ({
  children,
  match,
  session
}: {|
  children: React.Node,
  match: $Shape<Match<{ owner: string, repo: string }>>,
  session?: any
|}) => (
  <div>
    <div
      css={({ theme }) => ({
        marginBottom: theme.space[4],
        backgroundColor: '#fafafa',
        borderBottom: '1px solid #eee'
      })}
    >
      <RepositoryHeader
        forkedCount={-1}
        match={match}
        staredCount={-1}
        watchedCount={-1}
      />
      <RepositoryNavigations
        issuesCount={-1}
        match={match}
        pullRequestsCount={-1}
        projectsCount={-1}
        session={session}
      />
    </div>
    <InnerContainer>{children}</InnerContainer>
  </div>
)

export default Repository

export const RepositoryContainer = withRouter(Repository)
