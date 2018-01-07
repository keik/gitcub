import debug                           from 'debug'
import { highlight }                   from 'highlight.js'
import React, { Component, PropTypes } from 'react'
import { Link }                        from 'react-router'

import btnStyles   from '../../styles/btn.css'
import panelStyles from '../../styles/panel.css'
import styles      from './commit.css'

const d = debug('keik:gh:components:repository:commit')

export default class RepoCommit extends Component {
  static propTypes = {
    commit: PropTypes.shape({
      author: PropTypes.shape({
        date: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
      message: PropTypes.string.isRequired,
    }).isRequired,
    files: PropTypes.arrayOf(
      PropTypes.shape({
        filename: PropTypes.string.isRequired,
        patch: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
    params: PropTypes.shape({
      owner: PropTypes.string.isRequired,
      repo: PropTypes.string.isRequired,
      sha: PropTypes.string.isRequired,
    }).isRequired,
    parents: PropTypes.arrayOf(
      PropTypes.shape({
        sha: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
  }

  render() {
    d('render')
    const { commit: { author: { date, name }, message }, params: { owner, repo, sha }, files, parents } = this.props
    return (
      <div className={styles.container}>
        <div className={panelStyles.panel}>
          <div className={panelStyles.infoPanelHeader}>
            <a
              className={btnStyles.liteBtn}
              style={{float: 'right'}}
              href={`/${owner}/${repo}/tree/${sha}`}
            >
              Browse files
            </a>
            <div className={styles.commitTitle}>
              {message}
            </div>
            <div className={styles.commitBranches}>
              <i className="fa fa-code-fork" /> master
            </div>
          </div>
          <div className={panelStyles.panelBody}>
            <div className={styles.author}>
              <img alt={name} style={{verticalAlign: 'middle', width: 20, height: 20, background: '#ccc'}} /> {name} commited on <time-ago datetime={date} />
            </div>
            <div className={styles.sha}>
              <span>
                {parents.length} parent
                {parents.map(p => (
                   <Link
                     key={p.sha}
                     to={`/${owner}/${repo}/commit/${p.sha}`}>{p.sha.substr(0, 7)}
                   </Link>
                 ))}
              </span>
              <span>
                commit {sha}
              </span>
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

        <div id="patches">
          {files.map((file, i) => (
             <div
               className={panelStyles.panel}
               key={i}
             >
               <div className={panelStyles.defaultPanelHeader}>
                 {file.filename}
               </div>
               <pre>
                 <ul className={styles.lines}>
                   {(() => {
                      const e = [<li key={'padding'}>...</li>]
                      for (let i = 0; i < file.changes; i++) {
                        e.push(<li key={i + 1}>{i + 1}</li>)
                      }
                      return e
                    })()
                   }
                 </ul>
                 <code
                   className="hljs"
                   dangerouslySetInnerHTML={{__html: highlight('diff', file.patch).value}}
                 />
               </pre>
             </div>
           ))}
        </div>
      </div>
    )
  }
}
