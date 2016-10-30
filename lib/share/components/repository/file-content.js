import axios from 'axios'
import debug from 'debug'
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import btnStyles from '../../styles/btn.css'
import panelStyles from '../../styles/panel.css'
import styles from './file-content.css'
import * as RepositoryActions from '../../actions/repository-actions'

const d = debug('keik:gh:components:repository:file-content')

export default class RepoFileContent extends Component {
  static propTypes = {
    params: PropTypes.shape({
      branch:  PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired,
      repo: PropTypes.string.isRequired,
      splat:  PropTypes.string.isRequired,
    }).isRequired,
    size: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    contributors: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  static defaultProps = {
    contributors: ['a', 'b', 'c']
  }

  static fetchData = ({ dispatch, params: { branch, repo, owner, splat: path }, host='' }) => {
    d('fetchData')
    dispatch(RepositoryActions.fetching())
    return axios.get(`${host}/api/v1/repos/${owner}/${repo}/git/blobs/${branch}/${path}`)
      .then(({ data: entry } ) => {
        dispatch(RepositoryActions.fetchEntrySuccess({
          path: path,
          ...entry,
        }))
      })
      .catch(err => {
        console.error(err)
        dispatch(RepositoryActions.fetchFailure(err))
      })
  }

  render = () => {
    d('render')
    const { params: { branch, owner, repo, splat: path='' }, content, size, contributors } = this.props
    return (
      <div className={styles.container}>
        <div className={panelStyles.panel}>
          <div className={panelStyles.infoPanelHeader}>
            commit tease
          </div>
          <div className={panelStyles.panelBody}>
            <button>
              {contributors.length} contributors
            </button>
            {contributors.map(c => (
               <Link
                 key={c}
                 to={`/${c}`}
               >
                 <img alt={c} style={{verticalAlign: 'middle', width: 20, height: 20, background: '#ccc'}} />
               </Link>
            ))}
          </div>
        </div>
        <div className={panelStyles.panel}>
          <div className={panelStyles.defaultPanelHeader}>
            {[].concat(content.match(/\n/g)).length} line | {size} bytes
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
          <div className={panelStyles.panelBody}
            dangerouslySetInnerHTML={{__html: content}}
          />
        </div>
      </div>
    )
  }
}
