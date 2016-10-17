import React, { Component, PropTypes } from 'react'

import styles from './header.css'

export default class RepositoryHeader extends Component {
  static propTypes = {
    user: PropTypes.string.isRequired,
    repo: PropTypes.string.isRequired,
    watchedCount: PropTypes.number.isRequired,
    staredCount: PropTypes.number.isRequired,
    forkedCount: PropTypes.number.isRequired
  }

  componentDidMount = () => {
    window.addEventListener('mousedown', this.close)
  }

  close = () => {
    console.log('close')
    this.refs.subscriptionMenu.style.display = 'none'
  }

  render = () => {
    return (
      <div
        className={styles.container}>
        <div
          className="container">
          <h1>
            <a href={`/${this.props.user}`}>{this.props.user}</a> / <a href={`/${this.props.user}/${this.props.repo}`}>{this.props.repo}</a>
          </h1>
          <nav>
            <ul
              className={styles.pageheadActions}>
              <li>
                <div style={{position: 'relative'}}>
                  <button
                    onClick={() => {this.refs.subscriptionMenu.style.display = 'block' }}
                  >
                    <i className="fa fa-eye" />
                    Watch
                    <i className="fa fa-caret-down" />
                  </button>
                  <div
                    className={styles.subscriptionMenu}
                    style={{position: 'absolute', top: 0, left: 0, display: 'none'}}
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
                </div>
                <a href="#">{this.props.watchedCount}</a>
              </li>
              <li>
                <form>
                  <button>
                    <i className="fa fa-eye" />
                    Star
                  </button>
                  <a href="#">{this.props.staredCount}</a>
                </form>
              </li>
              <li>
                <form>
                  <button>
                    <i className="fa fa-eye" />
                    Fork
                  </button>
                  <a href="#">{this.props.forkedCount}</a>
                </form>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}
