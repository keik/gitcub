import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

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
    const { user, repo } = this.props.params
    const { actions, issuesCount, pullRequestsCount, projectsCount } = this.props
    return (
      <div
        className={styles.container}>
        <nav
          className={styles.reponav}>
          <ul onClick={(e) => e.preventDefault()}>
            <li>
              <Link to={`/${user}/${repo}/`}>Code</Link>
            </li>
            <li>
              <Link to={`/${user}/${repo}/issues`}>Issues {issuesCount}</Link>
            </li>
            <li>
              <Link to={`/${user}/${repo}//pulls`}>Pull requests {pullRequestsCount}</Link>
            </li>
            <li>
              <Link to={`/${user}/${repo}/projects`}>Projects {projectsCount}</Link>
            </li>
            <li>
              <Link to={`/${user}/${repo}/wiki`}>Wiki</Link>
            </li>
            <li>
              <Link to={`/${user}/${repo}/pulse`}>Pulse</Link>
            </li>
            <li>
              <Link to={`/${user}/${repo}/graphs`}>Graphs</Link>
            </li>
            <li>
              <Link to={`/${user}/${repo}/settings`}>Settings</Link>
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
