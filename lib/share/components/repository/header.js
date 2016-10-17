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

  render = () => {
    return (
      <div className={styles.container}>
        <div className="container">
          <h1>
            <a href={`/${this.props.user}`}>{this.props.user}</a> / <a href={`/${this.props.user}/${this.props.repo}`}>{this.props.repo}</a>
          </h1>
          <nav>
            <ul className={styles.pageheadActions}>
              <li><form><button>Watch {this.props.watchedCount}</button></form></li>
              <li><form><button>Star {this.props.staredCount}</button></form></li>
              <li><form><button>Fork {this.props.forkedCount}</button></form></li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}
