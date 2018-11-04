// @flow

import { highlight } from 'highlight.js'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import type { Dispatch } from 'redux'

import Code from '../common/blocks/Code'
import Panel from '../common/blocks/Panel'
import Button from '../common/atoms/Button'
import SegmentedButtonsContainer from '../common/layouts/SegmentedButtonsContainer'
import * as CommitsAction from '../../ducks/repository/commits'
import type { CommitWithDetailsT } from '../../../types/gh'
import type { ParentObj } from '../../../types/nodegit'

export const Commit = (props: {
  commit: ?CommitWithDetailsT,
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
    <div>
      <Panel>
        <Panel.Header info>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h1
              style={{
                margin: '0',
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#213f4d'
              }}
            >
              {commit.commit.message}
            </h1>
            <Button
              as="a"
              small
              transparent
              style={{ float: 'right' }}
              href={`/${owner}/${repo}/tree/${sha}`}
            >
              Browse files
            </Button>
          </div>
          <div
            style={{
              minHeight: '18px',
              margin: '0',
              fontSize: '12px',
              color: '#818c90'
            }}
          >
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
            <div
              style={{
                fontSize: '12px',
                lineHeight: '24px',
                color: '#767676',
                fontFamily:
                  'Consolas, "Liberation Mono", Menlo, Courier, monospace'
              }}
            >
              <span style={{ marginRight: '12px' }}>
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
              <Code style={{ margin: 0 }}>
                <Code.Lines>
                  {(() => {
                    const e = [<li key={'padding'}>...</li>]
                    for (let i = 0; i < file.changes; i++) {
                      e.push(<li key={i + 1}>{i + 1}</li>)
                    }
                    return e
                  })()}
                </Code.Lines>
                <Code.Body
                  className="hljs"
                  dangerouslySetInnerHTML={{
                    __html: highlight('diff', file.patch).value
                  }}
                />
              </Code>
            </Panel.Body>
          </Panel>
        ))}
      </div>
    </div>
  )
}

export default connect<_, _, *, _, *, _>(
  ({ commits }, { params: { sha } }) => ({
    commit: commits.find(c => c.sha === sha && c.files != null)
  })
)(
  class CommitContainer extends React.Component<{
    commit: ?CommitWithDetailsT,
    dispatch: Dispatch<*>,

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
