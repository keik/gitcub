// @flow

import React from 'react'
import { Link } from 'react-router'

import styles from './issues.css'
import btnStyles from '../../styles/btn.css'

import type { Issue } from '../../../types/nodegit'

export default function RepoIssues({
  issues = [],
  params
}: {
  issues: Array<Issue>,
  params: {
    owner: string,
    repo: string
  }
}) {
  const { owner, repo } = params
  return (
    <div className={styles.container}>
      <div className={styles.subnav}>
        <div className={styles.filter}>
          <button className={btnStyles.defaultSmBtn}>Filters</button>
          <form>
            <i className="fa fa-search" />
            <input />
          </form>
        </div>
        <div className={btnStyles.group}>
          <Link className={btnStyles.liteBtn} to={`/${owner}/${repo}/labels`}>
            Labels
          </Link>
          <Link
            className={btnStyles.liteBtn}
            to={`/${owner}/${repo}/milestones`}
          >
            Milestones
          </Link>
        </div>
      </div>

      <div className={styles.issuesHeader}>
        <div>
          <Link to={`/${owner}/${repo}/issues?q=is:open is:issue`}>
            <i className="fa fa-exclamation-circle" /> {issues.length} Open
          </Link>
        </div>
        <div>
          <Link to={`/${owner}/${repo}/issues?q=is:closed is:issue`}>
            <i className="fa fa-check" /> {-1} Closed
          </Link>
        </div>
      </div>
      <ul className={styles.issues}>
        {issues.map(issue => (
          <li key={issue.id} className={styles.issue}>
            <div className={styles.icon}>
              <i className="fa fa-exclamation-circle" />
            </div>
            <div className={styles.main}>
              <div className={styles.title}>
                <Link to={`/${owner}/${repo}/issues/${issue.id}`}>
                  {issue.title}
                </Link>
              </div>
              <div className={styles.sub}>
                <span>#{issue.id}</span> opened{' '}
                <time-ago datetime={issue.createdAt} /> by{' '}
                <Link to={`/${issue.createdBy}`}>{issue.createdBy}</Link>
              </div>
            </div>
            <div className={styles.comments}>
              {issue.commentsCount > 0 ? (
                <div>
                  <Link to={`/${owner}/${repo}/issues/${issue.id}`}>
                    <i className="fa fa-comment-o" /> {issue.commentsCount}
                  </Link>
                </div>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
