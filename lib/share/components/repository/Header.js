// @flow

import React from 'react'

import Button from '../common/atoms/Button'
import SegmentedButtonsContainer from '../common/layouts/SegmentedButtonsContainer'
import styles from './Header.css'
import Modal from '../common/Modal'

export default class RepoHeader extends React.Component<{
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
      <div className={styles.container}>
        <h1>
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
      </div>
    )
  }
}
