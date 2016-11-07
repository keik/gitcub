import debug                           from 'debug'
import React, { Component, PropTypes } from 'react'
import { Link }                        from 'react-router'

import btnStyles from '../../styles/btn.css'
import styles    from './commits.css'

const d = debug('keik:gh:components:repository:commits')

export default class RepoCommits extends Component {
  static propTypes = {
    commits: PropTypes.arrayOf(PropTypes.shape({
      commit: PropTypes.shape({
        author: PropTypes.shape({
          date: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        }).isRequired,
        message: PropTypes.string.isRequired,
      }).isRequired,
      html_url: PropTypes.string.isRequired,
      sha: PropTypes.string.isRequired,
    })).isRequired,
    params: PropTypes.shape({
      owner: PropTypes.string.isRequired,
      repo: PropTypes.string.isRequired,
    }).isRequired,
  }

  render = () => {
    d('render', this.props)
    const { commits, params: { owner, repo } } = this.props
    return (
      <div className={styles.container}>
        <ul>
          {commits.map((commit) => (
             <li
               key={commit.sha}>
               <div className={styles.avator}>
                 <Link to={`/${commit.commit.author.name}}`}>
                   <img alt="" src=""/>
                 </Link>
               </div>
               <div className={styles.main}>
                 <div className={styles.title}>
                   {commit.commit.message}
                 </div>
                 <div className={styles.meta}>
                   {commit.commit.author.name} commited on <time-ago datetime={commit.commit.author.date} />
                 </div>
               </div>
               <div className={styles.commitLinks}>
                 <span className={btnStyles.group}>
                   <button className={btnStyles.liteSmBtn}>
                     <i className="fa fa-clipboard" />
                   </button>
                   <Link
                     className={btnStyles.liteSmBtn}
                     to={`/${owner}/${repo}/commit/${commit.sha}`}
                   >
                     {commit.sha.substring(0, 7)}
                   </Link>
                 </span>
                 <Link
                   className={btnStyles.liteSmBtn}
                   to={`/${owner}/${repo}/tree/${commit.sha}`}
                 >
                   <i className="fa fa-code" />
                 </Link>
               </div>
             </li>
           ))}
        </ul>
      </div>
    )
  }
}
