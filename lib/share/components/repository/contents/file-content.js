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
      id: PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired,
      path:  PropTypes.string.isRequired,
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

  static fetchData = ({ dispatch, uri, path }) => {
    dispatch(RepositoryActions.fetching())
    return axios.get(uri)
                .then(({ data: entry } ) => {
                  dispatch(RepositoryActions.fetchEntrySuccess({
                    [path]: {
                      ...entry
                    },
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
    const { dispatch, params: { branch, owner, id, splat: path='' } } = this.props
    const host = (process != null) ? 'http://localhost:3000' : ''
    /* if (!fetched) {*/
    FileContent.fetchData({
      dispatch,
      uri: `${host}/api/v1/users/${owner}/repositories/${id}/branches/${branch}/entries/${path}`,
      path,
    })
  }

  render = () => {
    const { params: { branch, owner, id, splat: path='' }, entry: { bytes, content, lines } } = this.props
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
                  to={`/${owner}/${id}/raw/${branch}/${path}`}
                >
                  Raw
                </Link>
                <Link
                  className={btnStyles.defaultSmBtn}
                  to={`/${owner}/${id}/blame/${branch}/${path}`}
                >
                  Blame
                </Link>
                <Link
                  className={btnStyles.defaultSmBtn}
                  to={`/${owner}/${id}/commits/${branch}/${path}`}
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
