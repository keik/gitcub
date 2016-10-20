import React, { Component, PropTypes } from 'react'

import styles from './issues.css'
import btnStyles from '../../../styles/btn.css'

export default class Issues extends Component {
  static propTypes = {
    issues: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      createdBy: PropTypes.string.isRequired,
      commentsCount: PropTypes.number.isRequired,
    })).isRequired,
    repo: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
  }

  static defaultProps = {
    issues: []
  }

  render = () => {
    const { user, repo, issues } = this.props
    return (
      <div className={styles.container}>
        <div className={styles.subnav}>
          <div className={styles.filter}>
            <button className={btnStyles.btn}>Filters</button>
            <form>
              <i className="fa fa-search" />
              <input />
            </form>
          </div>
          <div className={btnStyles.group}>
            <a className={btnStyles.btn} href={`/${user}/${repo}/labels`}>Labels</a>
            <a className={btnStyles.btn} href={`/${user}/${repo}/milestones`}>Milestones</a>
          </div>
        </div>

        <div className={styles.issuesHeader}>
          <div>
            <a href={`/${user}/${repo}/issues?q=is:open is:issue`}>
              <i className="fa fa-exclamation-circle" /> {issues.length} Open
            </a>
          </div>
          <div>
            <a href={`/${user}/${repo}/issues?q=is:closed is:issue`}>
              <i className="fa fa-check" /> {-1} Closed
            </a>
          </div>
        </div>
        <ul className={styles.issues}>
          {issues.map(issue => (
             <li className={styles.issue}>
               <div className={styles.icon}>
                 <i className="fa fa-exclamation-circle" />
               </div>
               <div className={styles.main}>
                 <div className={styles.title}>
                   <a href={`/${user}/${repo}/issues/${issue.id}`}>
                     {issue.title}
                   </a>
                 </div>
                 <div className={styles.sub}>
                   <span>#{issue.id}</span> opened <time-ago datetime={issue.createdAt} /> by <a href={`/${issue.createdBy}`}>{issue.createdBy}</a>
                 </div>
               </div>
               <div className={styles.comments}>
                 {issue.commentsCount > 0 ?
                  <div>
                    <a href={`/${user}/${repo}/issues/${issue.id}`}>
                      <i className="fa fa-comment-o" /> {issue.commentsCount}
                    </a>
                  </div>
                  :
                  null
                 }
               </div>
             </li>
           ))}
        </ul>
      </div>
    )
  }
}
