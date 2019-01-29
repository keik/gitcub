// @flow

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import * as React from 'react'

import { Link, Route, withRouter, type Match } from 'react-router-dom'

import Button from './common/atoms/Button'
import Panel from './common/blocks/Panel'
import Dropdown from './common/blocks/Dropdown'
import InnerContainer from './common/layouts/InnerContainer'
import SegmentedButtonsContainer from './common/layouts/SegmentedButtonsContainer'

type Props = {
  children: React.Node,
  match: $Shape<Match<{ owner: string, repo: string }>>,
  session?: any
}
export const Repository = ({ children, match, session }: Props) => (
  <div>
    <div
      css={css`
        margin-bottom: 24px;
        background-color: #fafafa;
        border-bottom: 1px solid #eee;
      `}
    >
      <Header
        forkedCount={-1}
        match={match}
        staredCount={-1}
        watchedCount={-1}
      />
      <Navigations
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

export default withRouter(Repository)

const Header = ({
  forkedCount,
  match: {
    params: { owner, repo }
  },
  staredCount,
  watchedCount
}: {
  forkedCount: number,
  match: {
    params: {
      owner: string,
      repo: string
    }
  },
  staredCount: number,
  watchedCount: number
}) => (
  <InnerContainer>
    <div
      css={css`
        display: flex;
        justify-content: space-between;
      `}
    >
      <h1
        css={css`
          display: inline-block;
          color: #666;
          font-size: 18px;
        `}
      >
        <a href={`/${owner}`}>{owner}</a>
        <span
          css={css`
            margin: 0 4px;
          `}
        >
          /
        </span>
        <a href={`/${owner}/${repo}`}>{repo}</a>
      </h1>
      <nav>
        <ul
          css={css`
            list-style: none;
            padding: 0;
            > li {
              display: inline-block;
              margin-left: 12px;

              i:first-of-type {
                margin-right: 4px;
              }
            }
          `}
        >
          <li>
            <SegmentedButtonsContainer>
              <Dropdown
                toggler={
                  <Button small>
                    <i className="fa fa-eye" />
                    Watch
                    <i
                      className="fa fa-caret-down"
                      css={css`
                        margin-left: 4px;
                      `}
                    />
                  </Button>
                }
                width={300}
              >
                <SubscriptionMenu />
              </Dropdown>
              <Button as="a" href="#" small transparent>
                {watchedCount}
              </Button>
            </SegmentedButtonsContainer>
          </li>
          <li>
            <SegmentedButtonsContainer>
              <Button small>
                <i className="fa fa-star" />
                Star
              </Button>
              <Button as="a" href="#" small transparent>
                {staredCount}
              </Button>
            </SegmentedButtonsContainer>
          </li>
          <li>
            <SegmentedButtonsContainer>
              <Button small>
                <i className="fa fa-code-fork" />
                Fork
              </Button>
              <Button as="a" href="#" small transparent>
                {forkedCount}
              </Button>
            </SegmentedButtonsContainer>
          </li>
        </ul>
      </nav>
    </div>
  </InnerContainer>
)

const SubscriptionMenu = () => (
  <div>
    <Panel.Header>Notifications</Panel.Header>
    <Panel.Body noPadding>
      <ul
        css={css`
          list-style: none;
          padding: 0;
          > li {
            padding: 8px;
            :not(:last-child) {
              border-bottom: 1px solid #eee;
            }
            > a {
              color: inherit;
              > h2 {
                margin: 0;
                font-size: 14px;
              }
              > span {
                font-size: 12px;
              }
            }
          }
        `}
      >
        <li>
          <a href="#TODO">
            <h2>Not watching</h2>
            <span>Be notified when participating or @mentioned.</span>
          </a>
        </li>
        <li>
          <a href="#TODO">
            <h2>Watching</h2>
            <span>Be notified of all conversations.</span>
          </a>
        </li>
        <li>
          <a href="#TODO">
            <h2>Ignoring</h2>
            <span>Never be notified.</span>
          </a>
        </li>
      </ul>
    </Panel.Body>
  </div>
)

export const Navigations = ({
  issuesCount,
  match,
  pullRequestsCount,
  projectsCount,
  session
}: {
  issuesCount: number,
  match: $Shape<Match<{ owner: string, repo: string }>>,
  projectsCount: number,
  pullRequestsCount: number,
  session?: *
}) => {
  const { owner, repo } = match.params
  return (
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
            ['fa-code', 'Code', `/${owner}/${repo}`],
            [
              'fa-exclamation-circle',
              `Issues ${issuesCount}`,
              `/${owner}/${repo}/issues`
            ],
            [
              'fa-code-fork',
              `Pull requests ${pullRequestsCount}`,
              `/${owner}/${repo}/pulls`
            ],
            [
              'fa-group',
              `Projects ${projectsCount}`,
              `/${owner}/${repo}/projects`
            ],
            ['fa-book', 'Wiki', `/${owner}/${repo}/wiki`],
            ['fa-line-chart', 'Pulse', `/${owner}/${repo}/pulse`],
            ['fa-bar-chart', 'Graphs', `/${owner}/${repo}/graphs`],
            session != null
              ? ['fa-gear', 'Settings', `/${owner}/${repo}/settings`]
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
}
