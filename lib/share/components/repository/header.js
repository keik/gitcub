// @flow

import PropTypes from 'prop-types'
import React from 'react'

import styles from './header.css'
import Modal from '../common/modal'
import btnStyles from '../../styles/btn.css'

export default class RepoHeader extends React.Component<{
  forkedCount: number,
  params: {
    owner: string,
    repo: string
  },
  staredCount: number,
  watchedCount: number
}> {
  _subscriptionMenuModal: typeof Modal
  subscriptionMenu: typeof Modal

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
              <div className={btnStyles.group}>
                <button
                  className={btnStyles.defaultSmBtn}
                  onClick={() => {
                    this._subscriptionMenuModal.open()
                  }}
                >
                  <i className="fa fa-eye" />
                  Watch
                  <i className="fa fa-caret-down" />
                </button>
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
                          <span>
                            Be notified when participating or @mentioned.
                          </span>
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
                <a className={btnStyles.liteSmBtn} href="#">
                  {watchedCount}
                </a>
              </div>
            </li>
            <li>
              <form>
                <div className={btnStyles.group}>
                  <button className={btnStyles.defaultSmBtn}>
                    <i className="fa fa-star" />
                    Star
                  </button>
                  <a className={btnStyles.liteSmBtn} href="#">
                    {staredCount}
                  </a>
                </div>
              </form>
            </li>
            <li>
              <form>
                <div className={btnStyles.group}>
                  <button className={btnStyles.defaultSmBtn}>
                    <i className="fa fa-code-fork" />
                    Fork
                  </button>
                  <a className={btnStyles.liteSmBtn} href="#">
                    {forkedCount}
                  </a>
                </div>
              </form>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}
