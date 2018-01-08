// @flow

import debug from 'debug'
import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router'

import btnStyles from '../../styles/btn.css'
import styles from './commits.css'

import type { Commit, Parent } from '../../../types/nodegit'

const d = debug('keik:gh:components:repository:commits')

export default class RepoCommits extends React.Component<{
  commits: Array<{
    commit: Commit,
    parents: Array<Parent>,
    sha: string,
    url: string
  }>,
  params: {
    owner: string,
    repo: string
  }
}> {
  render() {
    d('render', this.props)
    const { commits, params: { owner, repo } } = this.props
    return (
      <div className={styles.container}>
        <ul>
          {commits.map(commit => (
            <li key={commit.sha}>
              <div className={styles.avator}>
                <Link to={`/${commit.commit.author.name}}`}>
                  <img alt="" src="" />
                </Link>
              </div>
              <div className={styles.main}>
                <div className={styles.title}>{commit.commit.message}</div>
                <div className={styles.meta}>
                  {commit.commit.author.name} commited on{' '}
                  <time-ago datetime={commit.commit.author.date} />
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
