import React from 'react'

import styles from './navigations.css'

export default class RepositoryNavigations extends React.Component {
  constructor () {
    super()
  }

  render () {
    const basePath = `${this.props.user}/${this.props.repo}`

    return (
      <div className={styles.container}>
        <div className="container">
          <nav className={styles.reponav}>
            <ul onClick={this.handleClickNavigation.bind(this)}>
              <li><a href="">Code</a></li>
              <li><a href="issues">Issues {this.props.issuesCount}</a></li>
              <li><a href="pulls">Pull requests {this.props.pullRequestsCount}</a></li>
              <li><a href="projects">Projects {this.props.projectsCount}</a></li>
              <li><a href="wiki">Wiki</a></li>
              <li><a href="pulse">Pulse</a></li>
              <li><a href="graph">Graphs</a></li>
              <li><a href="settings">Settings</a></li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }

  handleClickNavigation (e) {
    e.preventDefault()
    this.props.onUpdate({showingContent: e.target.getAttribute('href')})
  }
}

RepositoryNavigations.propTypes = {
  user: React.PropTypes.string.isRequired,
  repo: React.PropTypes.string.isRequired,
  issuesCount: React.PropTypes.number.isRequired,
  pullRequestsCount: React.PropTypes.number.isRequired,
  projectsCount: React.PropTypes.number.isRequired
}