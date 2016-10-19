import React, { Component, PropTypes } from 'react'

import styles from './header.css'
import btnStyles from '../../styles/btn.css'
import Modal from '../common/modal'

export default class RepositoryHeader extends Component {
  static propTypes = {
    user: PropTypes.string.isRequired,
    repo: PropTypes.string.isRequired,
    watchedCount: PropTypes.number.isRequired,
    staredCount: PropTypes.number.isRequired,
    forkedCount: PropTypes.number.isRequired
  }

  render = () => {
    return (
      <div
        className={styles.container}>
        <h1>
          <a href={`/${this.props.user}`}>{this.props.user}</a> / <a href={`/${this.props.user}/${this.props.repo}`}>{this.props.repo}</a>
        </h1>
        <nav>
          <ul
            className={styles.pageheadActions}>
            <li>
              <button
                className={btnStyles.smBtn}
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
              <a href="#">{this.props.watchedCount}</a>
            </li>
            <li>
              <form>
                <button
                  className={btnStyles.smBtn}
                >
                  <i className="fa fa-eye" />
                  Star
                </button>
                <a href="#">{this.props.staredCount}</a>
              </form>
            </li>
            <li>
              <form>
                <button
                  className={btnStyles.smBtn}
                >
                  <i className="fa fa-eye" />
                  Fork
                </button>
                <a href="#">{this.props.forkedCount}</a>
              </form>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}
