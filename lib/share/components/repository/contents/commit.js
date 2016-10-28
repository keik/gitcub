import debug from 'debug'
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import btnStyles from '../../../styles/btn.css'
import panelStyles from '../../../styles/panel.css'
import styles from './commit.css'

const d = debug('keik:gh:components:repository:contents:commit')

export default class Commit extends Component {
  static propTypes = {
    author: PropTypes.shape({
      date: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
    message: PropTypes.string.isRequired,
    params: PropTypes.shape({
      owner: PropTypes.string.isRequired,
      repo: PropTypes.string.isRequired,
      sha: PropTypes.string.isRequired,
    }).isRequired,
    patches: PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
    parents: PropTypes.arrayOf(
      PropTypes.shape({
        sha: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
  }

  // DEV
  static defaultProps = {
    patches: [
      {
        path: 'a',
        content: 'aaaa'
      },
      {
        path: 'b',
        content: 'bbbb'
      }
    ]
  }

  render = () => {
    d('render')
    console.log(this.props)
    const { author: { date, name }, message, params: { owner, repo, sha }, patches, parents } = this.props
    return (
      <div className={styles.container}>
        <div className={panelStyles.panel}>
          <div className={panelStyles.panelHeader}>
            <Link
              className={btnStyles.liteBtn}
              to={`/${owner}/${repo}/tree/${sha}`} >Browse files
            </Link>
            <div>
              {message}
            </div>
            <div>
              <i className="fa fa-code-fork" /> master
            </div>
          </div>
          <div className={panelStyles.panelBody}>
            <div>
              {name} commited on <time-ago datetime={date} />
            </div>
            <div>
              {parents.length} parent
              {parents.map(p => (
                 <Link
                   key={p.sha}
                   to={`/${owner}/${repo}/tree/${p.sha}`}>{p.sha.substr(0, 7)}
                 </Link>
              ))}
              commit {sha}
            </div>
          </div>
        </div>

        <div>
          <div>
            <i className="fa fa-file-text-o"/> Showing N changed file with N addition and N deletion.
          </div>
          <div>
            <div className={btnStyles.group}>
              <button className={btnStyles.defaultSmBtn}>
                Unified
              </button>
              <button className={btnStyles.defaultSmBtn}>
                Split
              </button>
            </div>
          </div>
        </div>

        <div>
          {patches.map(patch => (
             <div
               className={panelStyles.panel}
               key={patch.path}
             >
               <div className={panelStyles.panelHeader}>
                 {patch.path}
               </div>
               <div className={panelStyles.panelBody}>
                 {patch.content}
               </div>
             </div>
           ))}
        </div>
      </div>
    )
  }
}
