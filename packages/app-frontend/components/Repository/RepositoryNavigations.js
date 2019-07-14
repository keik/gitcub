// @flow

import * as React from 'react'
import { Link, Route, type Match } from 'react-router-dom'
import { css } from 'styled-components'

import InnerContainer from '../common/layouts/InnerContainer'

const RepositoryNavigations = ({
  issuesCount,
  match,
  pullRequestsCount,
  projectsCount,
  session
}: {|
  issuesCount: number,
  match: $Shape<Match<{ owner: string, repo: string }>>,
  projectsCount: number,
  pullRequestsCount: number,
  session?: *
|}) => (
  <InnerContainer>
    <nav>
      <ul
        css={css`
          display: flex;
          list-style: none;
          padding: 0;
          margin: 0;
          width: 100%;

          a {
            display: block;
            padding: 7px 15px 8px;
            margin-bottom: -1px;
            color: #666;
          }
          .selected {
            background-color: #fff;
            border-left: 1px solid #e5e5e5;
            border-top: 3px solid #d26911;
            border-right: 1px solid #e5e5e5;
          }
          .fa {
            margin-right: 0.5em;
          }
        `}
      >
        {[
          ['fa-code', 'Code', `/${match.params.owner}/${match.params.repo}`],
          [
            'fa-exclamation-circle',
            `Issues ${issuesCount}`,
            `/${match.params.owner}/${match.params.repo}/issues`
          ],
          [
            'fa-code-fork',
            `Pull requests ${pullRequestsCount}`,
            `/${match.params.owner}/${match.params.repo}/pulls`
          ],
          [
            'fa-group',
            `Projects ${projectsCount}`,
            `/${match.params.owner}/${match.params.repo}/projects`
          ],
          [
            'fa-book',
            'Wiki',
            `/${match.params.owner}/${match.params.repo}/wiki`
          ],
          [
            'fa-line-chart',
            'Pulse',
            `/${match.params.owner}/${match.params.repo}/pulse`
          ],
          [
            'fa-bar-chart',
            'Graphs',
            `/${match.params.owner}/${match.params.repo}/graphs`
          ],
          session != null
            ? [
                'fa-gear',
                'Settings',
                `/${match.params.owner}/${match.params.repo}/settings`
              ]
            : null
        ].map(
          r =>
            r != null && (
              <li key={r[0]}>
                <Route
                  exact
                  path={r[2]}
                  // eslint-disable-next-line
                  children={({ match }) => (
                    <Link className={match ? 'selected' : ''} to={r[2]}>
                      <i className={`fa ${r[0]}`} />
                      {r[1]}
                    </Link>
                  )}
                />
              </li>
            )
        )}
      </ul>
    </nav>
  </InnerContainer>
)

export default RepositoryNavigations
