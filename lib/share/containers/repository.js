import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import RepositoryHeader from '../components/repository/header'
import RepositoryNavigations from '../components/repository/navigations'
import styles from './repository.css'
import * as RepositoryActions from '../actions/repository'

class RepositoryContainer extends Component {

  static propTypes = {
    params: PropTypes.shape({
      repo: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired,
    }).isRequired,
    branches: PropTypes.arrayOf(PropTypes.string)
  }

  // DEV
  static defaultProps = {
    watchedCount: -1,
    staredCount: -1,
    forkedCount: -1,
    initialShowingContent: '',
    commitsCount: -1,
    releasesCount: -1,
    contributorsCount: -1,
    issuesCount: -1,
    pullRequestsCount: -1,
    projectsCount: -1
  }

  componentDidMount() {
    const { dispatch } = this.props
    const { user, repo } = this.props.params
    dispatch(RepositoryActions.fetchRepositoryPropsIfNeeded(user, repo))
  }

  /* static fetchData = () => {
   *   return new Promise((resolve, reject) => {
   *     console.log('bbb')
   *     resolve('bbb')
   *   })
   * }*/

  constructor(props) {
    super()
    this.state = {
      user: props.user,
      repo: props.repo,
      branches: props.branches,
      branch: props.initialBranch,
      commits: props.initialCommits,
      entries: props.initialEntries,
    }
  }

  render = () => {
    console.log(this.props)
    const { children } = this.props
    const props = Object.assign({}, this.props, this.state, this.props.params)
    return (
      <div>
        <div className={styles.pageHead}>
          <RepositoryHeader {...props} />
          <RepositoryNavigations {...props} />
        </div>
        {children}
      </div>
    )
  }
}

const mapStateToProps = (state) => (state)

export default connect(mapStateToProps)(RepositoryContainer)
