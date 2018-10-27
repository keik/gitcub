// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import styled from 'styled-components'

import Button from './common/atoms/Button'
import InnerContainer from './common/layouts/InnerContainer'
import SegmentedButtonsContainer from './common/layouts/SegmentedButtonsContainer'
import Modal from './common/Modal'

export const Repository = ({
  children,
  forkedCount = 1,
  issuesCount = -1,
  params,
  pullRequestsCount = -1,
  projectsCount = -1,
  staredCount = -1,
  watchedCount = -1,
  routes,
  session
}: {
  children: React.Node,
  forkedCount: number,
  issuesCount: number,
  params: {
    owner: string,
    repo: string
  },
  pullRequestsCount: number,
  projectsCount: number,
  staredCount: number,
  watchedCount: number,
  routes: any,
  session: any
}) => (
  <div>
    <div
      style={{
        marginBottom: '24px',
        backgroundColor: '#fafafa',
        borderBottom: '1px solid #eee'
      }}
    >
      <Header
        forkedCount={forkedCount}
        params={params}
        staredCount={staredCount}
        watchedCount={watchedCount}
      />
      <Navigations
        issuesCount={issuesCount}
        params={params}
        pullRequestsCount={pullRequestsCount}
        projectsCount={projectsCount}
        routes={routes}
        session={session}
      />
    </div>
    <InnerContainer>{children}</InnerContainer>
  </div>
)

export default connect(state => ({
  repository: state.repository,
  fetched: state.fetched
}))(Repository)

class Header extends React.Component<{
  forkedCount: number,
  params: {
    owner: string,
    repo: string
  },
  staredCount: number,
  watchedCount: number
}> {
  _subscriptionMenuModal: ?Modal

  render() {
    const {
      forkedCount,
      params: { owner, repo },
      staredCount,
      watchedCount
    } = this.props
    return (
      <InnerContainer>
        <$FlexContainer>
          <h1
            style={{
              display: 'inline-block',
              color: '#666',
              fontSize: '18px'
            }}
          >
            <a href={`/${owner}`}>{owner}</a>
            &nbsp;/&nbsp;
            <a href={`/${owner}/${repo}`}>{repo}</a>
          </h1>
          <nav>
            <ul>
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
                    <i className="fa fa-caret-down" />
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
        </$FlexContainer>
        <Modal ref={c => (this._subscriptionMenuModal = c)}>
          <SubscriptionMenu />
        </Modal>
      </InnerContainer>
    )
  }
}

const $FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  > nav {
    list-style: none;
    padding: 0;

    li {
      display: inline-block;
      margin-left: 12px;
    }

    i:first-child {
      margin-right: 4px;
    }

    .fa-caret-down {
      margin-left: 4px;
    }
  }
`

const SubscriptionMenu = styled(({ className }) => (
  <div className={className}>
    <div>
      Notifications
      <a href="#">x</a>
    </div>
    <ul>
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
))`
  background-color: #fff;

  > ul {
    list-style: none;
    padding: 0;
    > li {
      padding: 8px;
      border-bottom: 1px solid #eee;
    }
  }
`

export const Navigations = styled(
  ({
    className,
    issuesCount,
    params,
    pullRequestsCount,
    projectsCount,
    routes,
    session
  }: {
    className: string,
    issuesCount: number,
    params: {
      owner: string,
      repo: string
    },
    pullRequestsCount: number,
    projectsCount: number,
    routes: any,
    session: ?any
  }) => {
    const { owner, repo } = params
    const lastRoutePath = routes[routes.length - 1].path || ''
    return (
      <InnerContainer className={className}>
        <nav className="reponav">
          <ul>
            <li
              className={
                /^($|branches|blob|commit|tree)/.test(lastRoutePath)
                  ? 'selected'
                  : ''
              }
            >
              <Link to={`/${owner}/${repo}`}>
                <i className="fa fa-code" />
                Code
              </Link>
            </li>
            <li className={/^issues/.test(lastRoutePath) ? 'selected' : ''}>
              <Link to={`/${owner}/${repo}/issues`}>
                <i className="fa fa-exclamation-circle" />
                Issues {issuesCount}
              </Link>
            </li>
            <li className={/^pulls/.test(lastRoutePath) ? 'selected' : ''}>
              <Link to={`/${owner}/${repo}/pulls`}>
                <i className="fa fa-code-fork" />
                Pull requests {pullRequestsCount}
              </Link>
            </li>
            <li className={/^projects/.test(lastRoutePath) ? 'selected' : ''}>
              <Link to={`/${owner}/${repo}/projects`}>
                <i className="fa fa-group" />
                Projects {projectsCount}
              </Link>
            </li>
            {session != null && (
              <li className={/^wiki/.test(lastRoutePath) ? 'selected' : ''}>
                <Link to={`/${owner}/${repo}/wiki`}>
                  <i className="fa fa-book" />
                  Wiki
                </Link>
              </li>
            )}
            <li className={/^pulse/.test(lastRoutePath) ? 'selected' : ''}>
              <Link to={`/${owner}/${repo}/pulse`}>
                <i className="fa fa-line-chart" />
                Pulse
              </Link>
            </li>
            <li className={/^graphs/.test(lastRoutePath) ? 'selected' : ''}>
              <Link to={`/${owner}/${repo}/graphs`}>
                <i className="fa fa-bar-chart" />
                Graphs
              </Link>
            </li>
            {session != null && (
              <li className={/^settings/.test(lastRoutePath) ? 'selected' : ''}>
                <Link to={`/${owner}/${repo}/settings`}>
                  <i className="fa fa-gear" />
                  Settings
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </InnerContainer>
    )
  }
)`
  .reponav ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
  }

  .reponav a {
    display: block;
    padding: 7px 15px 8px;
    margin-bottom: -1px;
    color: #666;
  }
  .reponav .selected a {
    background-color: #fff;
    border-left: 1px solid #e5e5e5;
    border-top: 3px solid #d26911;
    border-right: 1px solid #e5e5e5;
  }
  .reponav .fa {
    margin-right: 0.5em;
  }
`
