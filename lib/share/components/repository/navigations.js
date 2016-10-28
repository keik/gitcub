import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import styles from './navigations.css'

export default class RepositoryNavigations extends Component {
  static propTypes = {
    issuesCount: PropTypes.number.isRequired,
    params: PropTypes.shape({
      owner: PropTypes.string.isRequired,
      repo: PropTypes.string.isRequired,
    }).isRequired,
    pullRequestsCount: PropTypes.number.isRequired,
    projectsCount: PropTypes.number.isRequired,
  }

  render = () => {
    const { issuesCount, params: { owner, repo }, pullRequestsCount, projectsCount } = this.props
    return (
      <div
        className={styles.container}>
        <nav
          className={styles.reponav}>
          <ul onClick={(e) => e.preventDefault()}>
            <li>
              <Link to={`/${owner}/${repo}/`}>Code</Link>
            </li>
            <li>
              <Link to={`/${owner}/${repo}/issues`}>Issues {issuesCount}</Link>
            </li>
            <li>
              <Link to={`/${owner}/${repo}/pulls`}>Pull requests {pullRequestsCount}</Link>
            </li>
            <li>
              <Link to={`/${owner}/${repo}/projects`}>Projects {projectsCount}</Link>
            </li>
            <li>
              <Link to={`/${owner}/${repo}/wiki`}>Wiki</Link>
            </li>
            <li>
              <Link to={`/${owner}/${repo}/pulse`}>Pulse</Link>
            </li>
            <li>
              <Link to={`/${owner}/${repo}/graphs`}>Graphs</Link>
            </li>
            <li>
              <Link to={`/${owner}/${repo}/settings`}>Settings</Link>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}
