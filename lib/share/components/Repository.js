// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Button from './common/atoms/Button'
import InnerContainer from './common/layouts/InnerContainer'
import SegmentedButtonsContainer from './common/layouts/SegmentedButtonsContainer'
import Modal from './common/Modal'
import styles from './Repository.css'
import RepositoryNavigations from './Repository/Navigations'

export function Repository({
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
}) {
  return (
    <div>
      <div className={styles.pageHead}>
        <Header
          forkedCount={forkedCount}
          params={params}
          staredCount={staredCount}
          watchedCount={watchedCount}
        />
        <RepositoryNavigations
          issuesCount={issuesCount}
          params={params}
          pullRequestsCount={pullRequestsCount}
          projectsCount={projectsCount}
          routes={routes}
          session={session}
        />
      </div>
      {children}
    </div>
  )
}

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
  subscriptionMenu: ?HTMLElement

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
            <ul className={styles.pageheadActions}>
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
          <div
            className={styles.subscriptionMenu}
            ref={c => (this.subscriptionMenu = c)}
          >
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
        </Modal>
      </InnerContainer>
    )
  }
}

const $FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
