import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import styles from './header.css'
import btnStyles from '../../styles/btn.css'
import Modal from '../common/modal'

export default class RepositoryHeader extends Component {
  static propTypes = {
    forkedCount: PropTypes.number.isRequired,
    params: PropTypes.shape({
      owner: PropTypes.string.isRequired,
      repo: PropTypes.string.isRequired,
    }).isRequired,
    staredCount: PropTypes.number.isRequired,
    watchedCount: PropTypes.number.isRequired,
  }

  render = () => {
    const { forkedCount, params: { owner, repo }, staredCount, watchedCount } = this.props
    return (
      <div
        className={styles.container}>
        <h1>
          <Link to={`/${owner}`}>{owner}</Link>
          &nbsp;/&nbsp;
          <Link to={`/${owner}/${repo}`}>{repo}</Link>
        </h1>
        <nav>
          <ul
            className={styles.pageheadActions}>
            <li>
              <div className={btnStyles.group}>
                <button
                  className={btnStyles.defaultSmBtn}
                  onClick={(e) => {this._subscriptionMenuModal.open()}}
                >
                  <i className="fa fa-eye" />
                  Watch
                  <i className="fa fa-caret-down" />
                </button>
                <Modal
                  ref={c => this._subscriptionMenuModal = c}
                >
                  <div
                    className={styles.subscriptionMenu}
                    ref="subscriptionMenu"
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
                <a
                  className={btnStyles.liteSmBtn}
                  href="#"
                >
                  {watchedCount}
                </a>
              </div>
            </li>
            <li>
              <form>
                <div className={btnStyles.group}>
                  <button
                    className={btnStyles.defaultSmBtn}
                  >
                    <i className="fa fa-star" />
                    Star
                  </button>
                  <a
                    className={btnStyles.liteSmBtn}
                    href="#"
                  >
                    {staredCount}
                  </a>
                </div>
              </form>
            </li>
            <li>
              <form>
                <div className={btnStyles.group}>
                  <button
                    className={btnStyles.defaultSmBtn}
                  >
                    <i className="fa fa-code-fork" />
                    Fork
                  </button>
                  <a
                    className={btnStyles.liteSmBtn}
                    href="#"
                  >
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
