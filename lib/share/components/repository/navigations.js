import React, { Component, PropTypes } from 'react'

import styles from './navigations.css'

export default class RepositoryNavigations extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      showContent: PropTypes.func.isRequired,
    }),
    user: PropTypes.string.isRequired,
    repo: PropTypes.string.isRequired,
    issuesCount: PropTypes.number.isRequired,
    pullRequestsCount: PropTypes.number.isRequired,
    projectsCount: PropTypes.number.isRequired
  }

  render = () => {
    const { actions, issuesCount, pullRequestsCount, projectsCount } = this.props
    return (
      <div
        className={styles.container}>
        <nav
          className={styles.reponav}>
          <ul onClick={(e) => e.preventDefault()}>
            <li>
              <a
                href=""
                onClick={(e) => actions.showContent('')}
              >
                Code</a>
            </li>
            <li>
              <a href="issues"
                onClick={(e) => actions.showContent('issues')}
              >
                Issues {issuesCount}
              </a>
            </li>
            <li>
              <a href="pulls"
                onClick={(e) => actions.showContent('pulls')}
              >
                Pull requests {pullRequestsCount}
              </a>
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
