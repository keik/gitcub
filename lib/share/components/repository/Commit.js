// @flow

import { highlight } from 'highlight.js'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import type { Dispatch } from 'redux'

import styles from './Commit.css'
import Button from '../common/atoms/Button'
import InnerContainer from '../common/layouts/InnerContainer'
import SegmentedButtonsContainer from '../common/layouts/SegmentedButtonsContainer'
import * as CommitsAction from '../../ducks/repository/commits'
import panelStyles from '../../styles/panel.css'
import type { CommitWithDetailsT } from '../../../types/gh'
import type { FileObj, ParentObj } from '../../../types/nodegit'

class RepoCommit extends React.Component<{
  commit: ?CommitWithDetailsT,
  dispatch: Dispatch<*>,
  files: Array<FileObj>,
  params: {
    owner: string,
    repo: string,
    sha: string
  },
  parents: Array<ParentObj>
}> {
  async componentDidMount() {
    if (this.props.commit == null) {
      const {
        dispatch,
        params: { owner, repo, sha }
      } = this.props
      dispatch(await CommitsAction.fetchOneWithDetails({ owner, repo, sha }))
    }
  }

  async componentDidUpdate() {
    if (this.props.commit == null) {
      const {
        dispatch,
        params: { owner, repo, sha }
      } = this.props
      dispatch(await CommitsAction.fetchOneWithDetails({ owner, repo, sha }))
    }
  }

  render() {
    const {
      commit,
      params: { owner, repo, sha }
    } = this.props

    if (commit == null) return null

    return (
      <InnerContainer>
        <div className={panelStyles.panel}>
          <div className={panelStyles.infoPanelHeader}>
            <Button
              as="a"
              small
              transparent
              style={{ float: 'right' }}
              href={`/${owner}/${repo}/tree/${sha}`}
            >
              Browse files
            </Button>
            <div className={styles.commitTitle}>{commit.commit.message}</div>
            <div className={styles.commitBranches}>
              <i className="fa fa-code-fork" /> master
            </div>
          </div>
          <div className={panelStyles.panelBody}>
            <div className={styles.author}>
              <img
                alt={commit.commit.author.name}
                style={{
                  verticalAlign: 'middle',
                  width: 20,
                  height: 20,
                  background: '#ccc'
                }}
              />{' '}
              {commit.commit.author.name} commited on{' '}
              <time-ago datetime={commit.commit.author.date} />
            </div>
            <div className={styles.sha}>
              <span>
                {commit.parents.length} parent
                {commit.parents.map(p => (
                  <Link key={p.sha} to={`/${owner}/${repo}/commit/${p.sha}`}>
                    {p.sha.substr(0, 7)}
                  </Link>
                ))}
              </span>
              <span>commit {sha}</span>
            </div>
          </div>
        </div>

        <div>
          <div>
            <i className="fa fa-file-text-o" /> Showing N changed file with N
            addition and N deletion.
          </div>
          <div>
            <SegmentedButtonsContainer>
              <Button small>Unified</Button>
              <Button small>Split</Button>
            </SegmentedButtonsContainer>
          </div>
        </div>

        <div id="patches">
          {commit.files.map((file, i) => (
            <div className={panelStyles.panel} key={i}>
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
                  })()}
                </ul>
                <code
                  className="hljs"
                  dangerouslySetInnerHTML={{
                    __html: highlight('diff', file.patch).value
                  }}
                />
              </pre>
            </div>
          ))}
        </div>
      </InnerContainer>
    )
  }
}

export default connect(({ commits }, { params: { sha } }) => ({
  commit: commits.find(c => c.sha === sha && c.files != null)
}))(RepoCommit)
