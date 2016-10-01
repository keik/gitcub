import React from 'react'

import styles from './repository-header.css'

export default class RepositoryHeader extends React.Component {
  constructor () {
    super()
  }

  render () {
    return (
      <div className={styles.container}>
        <h1><a href={`/${this.props.user}`}>{this.props.user}</a> / <a href={`/${this.props.user}/${this.props.repo}`}>{this.props.repo}</a></h1>
        <nav>
          <ul className={styles.pageheadActions}>
            <li><form><button>Watch {this.props.watchedCount}</button></form></li>
            <li><form><button>Star {this.props.staredCount}</button></form></li>
            <li><form><button>Fork {this.props.forkedCount}</button></form></li>
          </ul>
        </nav>
      </div>
    )
  }
}

RepositoryHeader.propTypes = {
  user: React.PropTypes.string.isRequired,
  repo: React.PropTypes.string.isRequired,
  watchedCount: React.PropTypes.number.isRequired,
  staredCount: React.PropTypes.number.isRequired,
  forkedCount: React.PropTypes.number.isRequired
}
