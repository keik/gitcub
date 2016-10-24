import axios from 'axios'
import debug from 'debug'
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import btnStyles from '../../../styles/btn.css'
import styles from './file-content.css'
import * as RepositoryActions from '../../../actions/repository-actions'

const d = debug('keik:gh:components:repository:contents:file-content')

export default class FileContent extends Component {
  static propTypes = {
    params: PropTypes.shape({
      branch:  PropTypes.string.isRequired,
      path:  PropTypes.string.isRequired,
      repo: PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired,
    }).isRequired,
    entry: PropTypes.shape({
      lines: PropTypes.number.isRequired,
      bytes: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
    }).isRequired,
  }

  static defaultProps = {
    entry: {
      bytes: -1,
      content: 'DUMMY',
      lines: -1,
    },
  }

  static fetchData = ({ dispatch, branch, path, id, owner }) => {
    dispatch(RepositoryActions.fetching())
    return axios.get(`http://localhost:3000/api/v1/users/${owner}/repositories/${id}/branches/${branch}/entries/${path}`)
                .then(({ data: { bytes, content, lines } }) => {
                  dispatch(RepositoryActions.fetchEntrySuccess({
                    path,
                    bytes,
                    content,
                    lines,
                  }))
                })
                .catch(err => {
                  dispatch(RepositoryActions.fetchFailure(err))
                })
  }

  constructor(props) {
    super()
    d(props)
  }

  componentWillMount() {
    d('componentWillMount')
    const { dispatch, fetched, params } = this.props
    /* if (!fetched) {*/
      FileContent.fetchData({dispatch, ...params})
    /* }*/
  }

  render = () => {
    const { params: { branch, path, repo, owner }, entry: { bytes, content, lines } } = this.props
    return (
      <div className={styles.container}>
        <div className={styles.commitTease}>
          commit tease
        </div>
        <div className={styles.file}>
          <div className={styles.fileHeader}>
            {lines} line | {bytes} bytes
            <div className={styles.fileActions}>
              <div className={btnStyles.group}>
                <Link
                  className={btnStyles.defaultSmBtn}
                  to={`/${owner}/${repo}/raw/${branch}/${path}`}
                >
                  Raw
                </Link>
                <Link
                  className={btnStyles.defaultSmBtn}
                  to={`/${owner}/${repo}/blame/${branch}/${path}`}
                >
                  Blame
                </Link>
                <Link
                  className={btnStyles.defaultSmBtn}
                  to={`/${owner}/${repo}/commits/${branch}/${path}`}
                >
                  History
                </Link>
              </div>
              <form>
                <button>
                  <i className="fa fa-pencil" />
                </button>
              </form>
              <form>
                <button>
                  <i className="fa fa-trash" />
                </button>
              </form>
            </div>
          </div>
          <div
            className={styles.blobWrapper}
            dangerouslySetInnerHTML={{__html: content}}
          />
        </div>
      </div>
    )
  }
}
