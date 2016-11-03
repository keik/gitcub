import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import index from './index'

import styles from './navigations.css'

export default class RepoNavigations extends Component {
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
    const { issuesCount, params: { owner, repo }, pullRequestsCount, projectsCount, routes } = this.props
    const lastRoutePath = routes[routes.length - 1].path || ''
    return (
      <div
        className={styles.container}>
        <nav
          className={styles.reponav}>
          <ul onClick={(e) => e.preventDefault()}>
            <li className={/^($|branches|blob|commit|tree)/.test(lastRoutePath) ? styles.selected : ''}>
              <Link to={`/${owner}/${repo}/`}><i className="fa fa-code" />Code</Link>
            </li>
            <li className={/^issues/.test(lastRoutePath) ? styles.selected : ''}>
              <Link to={`/${owner}/${repo}/issues`}><i className="fa fa-exclamation-circle" />Issues {issuesCount}</Link>
            </li>
            <li className={/^pulls/.test(lastRoutePath) ? styles.selected : ''}>
              <Link to={`/${owner}/${repo}/pulls`}><i className="fa fa-code-fork" />Pull requests {pullRequestsCount}</Link>
            </li>
            <li className={/^projects/.test(lastRoutePath) ? styles.selected : ''}>
              <Link to={`/${owner}/${repo}/projects`}><i className="fa fa-group" />Projects {projectsCount}</Link>
            </li>
            <li className={/^wiki/.test(lastRoutePath) ? styles.selected : ''}>
              <Link to={`/${owner}/${repo}/wiki`}><i className="fa fa-book" />Wiki</Link>
            </li>
            <li className={/^pulse/.test(lastRoutePath) ? styles.selected : ''}>
              <Link to={`/${owner}/${repo}/pulse`}><i className="fa fa-line-chart" />Pulse</Link>
            </li>
            <li className={/^graphs/.test(lastRoutePath) ? styles.selected : ''}>
              <Link to={`/${owner}/${repo}/graphs`}><i className="fa fa-bar-chart" />Graphs</Link>
            </li>
            <li className={/^settings/.test(lastRoutePath) ? styles.selected : ''}>
              <Link to={`/${owner}/${repo}/settings`}><i className="fa fa-gear" />Settings</Link>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}
