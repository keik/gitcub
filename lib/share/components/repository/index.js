import axios from 'axios'
import debug from 'debug'
import React, { Component, PropTypes } from 'react'

import RepositoryHeader from './header'
import RepositoryNavigations from './navigations'
import styles from './index.css'
import * as RepositoryActions from '../../actions/repository-actions'

const d = debug('keik:gh:components:repository')

export default class Repository extends Component {

  static propTypes = {
    branch: PropTypes.string.isRequired,
    branches: PropTypes.arrayOf(PropTypes.string),
    commits: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
    })),
    entries: PropTypes.objectOf(PropTypes.shape({
      lastCommit: PropTypes.shape({
        message: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    })),
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired,
    }).isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
  }

  // DEV
  static defaultProps = {
    branch: 'master',
    watchedCount: -1,
    staredCount: -1,
    forkedCount: -1,
    initialShowingContent: '',
    contributorsCount: -1,
    issuesCount: -1,
    pullRequestsCount: -1,
    projectsCount: -1
  }

  static fetchData = ({ dispatch, params: { branch='master', id, owner } }) => {
    dispatch(RepositoryActions.fetching())
    const host = (typeof window === 'undefined') ? 'http://localhost:3000' : ''
    return Promise.all([
      axios.get(`${host}/api/v1/users/${owner}/repositories/${id}/commits`),
      axios.get(`${host}/api/v1/users/${owner}/repositories/${id}/branches`),
      axios.get(`${host}/api/v1/users/${owner}/repositories/${id}/tags`)
    ])
      .then(([
        {data: commits},
        {data: branches},
        {data: tags}
      ]) =>
        dispatch(RepositoryActions.fetchSuccess({
          commits,
          branches,
          tags,
        })))
      .catch(err =>
        dispatch(RepositoryActions.fetchFailure(err)))
  }

  componentWillMount() {
    d('componentWillMount')
    const { dispatch, fetched, params } = this.props
    if (!fetched) {
      Repository.fetchData({
        dispatch,
        params,
      })
    }
  }

  constructor(props) {
    super()
    d('constructor')
    this.state = {
      owner: props.owner,
      id: props.id,
      branches: props.branches,
      branch: props.initialBranch,
      commits: props.initialCommits,
      entries: props.initialEntries,
    }
  }

  render = () => {
    d('render')
    const { children } = this.props
    return (
      <div>
        <div className={styles.pageHead}>
          <RepositoryHeader {...this.props} />
          <RepositoryNavigations {...this.props} />
        </div>
        {(Array.isArray(children) ? children : [children]).map((c, i) => (
           React.cloneElement(c, {key: i, ...this.props})
         ))}
      </div>
    )
  }
}
