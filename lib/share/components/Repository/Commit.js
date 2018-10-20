// @flow

import { highlight } from 'highlight.js'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import type { Dispatch } from 'redux'

import styles from './Commit.css'
import Panel from '../common/blocks/Panel'
import Button from '../common/atoms/Button'
import InnerContainer from '../common/layouts/InnerContainer'
import SegmentedButtonsContainer from '../common/layouts/SegmentedButtonsContainer'
import * as CommitsAction from '../../ducks/repository/commits'
import type { CommitWithDetailsT } from '../../../types/gh'
import type { FileObj, ParentObj } from '../../../types/nodegit'

export const Commit = (props: {
  commit: ?CommitWithDetailsT,
  files: Array<FileObj>,
  params: {
    owner: string,
    repo: string,
    sha: string
  },
  parents: Array<ParentObj>
}) => {
  const {
    commit,
    params: { owner, repo, sha }
  } = props

  if (commit == null) return null

  return (
    <InnerContainer>
      <Panel>
        <Panel.Header info>
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
        </Panel.Header>
        <Panel.Body>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
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
        </Panel.Body>
      </Panel>

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
          <Panel key={i}>
            <Panel.Header>{file.filename}</Panel.Header>
            <Panel.Body style={{ padding: 0 }}>
              <pre style={{ margin: 0 }}>
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
                  style={{ backgroundColor: 'white' }}
                  dangerouslySetInnerHTML={{
                    __html: highlight('diff', file.patch).value
                  }}
                />
              </pre>
            </Panel.Body>
          </Panel>
        ))}
      </div>
    </InnerContainer>
  )
}

export default connect(({ commits }, { params: { sha } }) => ({
  commit: commits.find(c => c.sha === sha && c.files != null)
}))(
  class CommitContainer extends React.Component<{
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
      return <Commit {...this.props} />
    }
  }
)
