// @flow

import * as React from 'react'

import { Link, Route, withRouter, type Match } from 'react-router-dom'

import Button from './common/atoms/Button'
import InnerContainer from './common/layouts/InnerContainer'
import SegmentedButtonsContainer from './common/layouts/SegmentedButtonsContainer'
import Modal from './common/Modal'

type Props = {
  children: React.Node,
  match: $Shape<Match<{ owner: string, repo: string }>>,
  session?: any
}
export const Repository = ({ children, match, session }: Props) => (
  <div>
    <div
      css={`
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

class Header extends React.Component<{
  forkedCount: number,
  match: {
    params: {
      owner: string,
      repo: string
    }
  },
  staredCount: number,
  watchedCount: number
}> {
  _subscriptionMenuModal: ?Modal

  render() {
    const {
      forkedCount,
      match: {
        params: { owner, repo }
      },
      staredCount,
      watchedCount
    } = this.props
    return (
      <InnerContainer>
        <div
          css={`
            display: flex;
            justify-content: space-between;
          `}
        >
          <h1
            css={`
              display: inline-block;
              color: #666;
              font-size: 18px;
            `}
          >
            <a href={`/${owner}`}>{owner}</a>
            <span
              css={`
                margin: 0 4px;
              `}
            >
              /
            </span>
            <a href={`/${owner}/${repo}`}>{repo}</a>
          </h1>
          <nav>
            <ul
              css={`
                list-style: none;
                padding: 0;
                > li {
                  display: inline-block;
                  margin-left: 12px;

                  i:first-child {
                    margin-right: 4px;
                  }
                }
              `}
            >
              <li>
                <SegmentedButtonsContainer>
                  <Button
                    onClick={() => {
                      this._subscriptionMenuModal &&
                        this._subscriptionMenuModal.open()
                    }}
                    small
                  >
                    <i className="fa fa-eye" />
                    Watch
                    <i
                      className="fa fa-caret-down"
                      css={`
                        margin-left: 4px;
                      `}
                    />
                  </Button>
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
        <Modal ref={c => (this._subscriptionMenuModal = c)}>
          <SubscriptionMenu />
        </Modal>
      </InnerContainer>
    )
  }
}

const SubscriptionMenu = () => (
  <div
    css={`
      background-color: #fff;
    `}
  >
    <div>
      Notifications
      <a href="#">x</a>
    </div>
    <ul
      css={`
        list-style: none;
        padding: 0;
        > li {
          padding: 8px;
          border-bottom: 1px solid #eee;
        }
      `}
    >
      <li>
        <a>
          <span>Not watching</span>
          <span>Be notified when participating or @mentioned.</span>
        </a>
      </li>
      <li>
        <a>
          <span>Watching</span>
          <span>Be notified of all conversations.</span>
        </a>
      </li>
      <li>
        <a>
          <span>Ignoring</span>
          <span>Never be notified.</span>
        </a>
      </li>
    </ul>
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
      <nav className="reponav">
        <ul
          css={`
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
