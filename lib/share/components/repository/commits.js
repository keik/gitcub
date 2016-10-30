import debug from 'debug'
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import btnStyles from '../../styles/btn.css'
import styles from './commits.css'

const d = debug('keik:gh:components:repository:commits')

export default class RepoCommits extends Component {
  static propTypes = {
    commits: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
    })),
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
               key={commit.id}>
               <div className={styles.avator}>
                 <Link to="TODO /commit.author">
                   <img alt="" src=""/>
                 </Link>
               </div>
               <div className={styles.main}>
                 <div className={styles.title}>
                   {commit.message}
                 </div>
                 <div className={styles.meta}>
                   TODO commit.author commited on <time-ago datetime={commit.date} />
                 </div>
               </div>
               <div className={styles.commitLinks}>
                 <span className={btnStyles.group}>
                   <button className={btnStyles.liteSmBtn}>
                     <i className="fa fa-clipboard" />
                   </button>
                   <Link
                     className={btnStyles.liteSmBtn}
                     to={`/${owner}/${repo}/commit/${commit.id}`}
                   >
                     {commit.id.substring(0, 7)}
                   </Link>
                 </span>
                 <Link
                   className={btnStyles.liteSmBtn}
                   to={`/${owner}/${repo}/tree/${commit.id}`}
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