import React, { Component, PropTypes } from 'react'

import styles from './navigations.css'

export default class RepositoryNavigations extends Component {
  static propTypes = {
    user: PropTypes.string.isRequired,
    repo: PropTypes.string.isRequired,
    issuesCount: PropTypes.number.isRequired,
    pullRequestsCount: PropTypes.number.isRequired,
    projectsCount: PropTypes.number.isRequired
  }

  render = () => {
    const { issuesCount, pullRequestsCount, projectsCount } = this.props
    return (
      <div
        className={styles.container}>
        <nav
          className={styles.reponav}>
          <ul
            onClick={this.handleClickNavigation}>
            <li>
              <a href="">Code</a>
            </li>
            <li>
              <a href="issues">Issues {issuesCount}</a>
            </li>
            <li>
              <a href="pulls">Pull requests {pullRequestsCount}</a>
            </li>
            <li>
              <a href="projects">Projects {projectsCount}</a>
            </li>
            <li>
              <a href="wiki">Wiki</a>
            </li>
            <li>
              <a href="pulse">Pulse</a>
            </li>
            <li>
              <a href="graphs">Graphs</a>
            </li>
            <li>
              <a href="settings">Settings</a>
            </li>
          </ul>
        </nav>
      </div>
    )
  }

  handleClickNavigation = (e) => {
    e.preventDefault()
    this.props.onUpdate({showingContent: e.target.getAttribute('href')})
  }
}
