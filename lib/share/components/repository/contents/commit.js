import debug from 'debug'
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import btnStyles from '../../../styles/btn.css'
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
    parent: PropTypes.shape({
      sha: PropTypes.string.isRequired,
    }).isRequired,
  }

  // DEV
  static defaultProps = {
    author: {
      date: "2014-11-07T22:01:45Z",
      name: "Scott Chacon",
      email: "schacon@gmail.com"
    },
    message: 'Update examples URI',
    parent: {
      sha: 'aaa'
    },
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
    const { author: { date, email, name }, message, params: { owner, repo, sha }, patches, parent: { sha: parentSha } } = this.props
    return (
      <div className={styles.container}>
        <div>
          <Link
            className={btnStyles.liteBtn}
            to={`/${owner}/${repo}/tree/${sha}`} >Browse files
          </Link>
          <div>
            {message}
          </div>
          <div>
            commit-branches
            <i className="fa fa-fork" /> master
          </div>
          <div>
            {name} commited on <time-ago datetime={date} />
          </div>
          <div>
            1 parent <Link to={`/${owner}/${repo}/tree/${parentSha}`}>{parentSha.substr(0, 7)}</Link>
            commit {sha}
          </div>
        </div>

        <div>
          <div>
            <i className="fa fa-text-o"/> Showing N changed file with N addition and N deletion.
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
             <div key={patch.path}>
               <div>
                 {patch.path}
               </div>
               <div>
                 {patch.content}
               </div>
             </div>
           ))}
        </div>
      </div>
    )
  }
}
