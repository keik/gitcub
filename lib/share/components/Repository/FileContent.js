// @flow

import { highlight, getLanguage } from 'highlight.js'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import type { Dispatch } from 'redux'
import { extname } from 'path'

import styles from './FileContent.css'
import Button from '../common/atoms/Button'
import Panel from '../common/blocks/Panel'
import InnerContainer from '../common/layouts/InnerContainer'
import SegmentedButtonsContainer from '../common/layouts/SegmentedButtonsContainer'
import type { ReducersStateT } from '../../ducks'
import * as EntriesAction from '../../ducks/repository/entries'
import type { EntryT } from '../../../types/gh'

export class FileContent extends React.Component<{
  params: {
    branch: string,
    owner: string,
    repo: string,
    splat: string
  },
  contributors: Array<string>,
  dispatch: Dispatch<*>,
  entry: ?EntryT
}> {
  static defaultProps = {
    contributors: ['a', 'b', 'c']
  }

  async componentDidMount() {
    const {
      dispatch,
      params: { branch, owner, repo, splat: path = '' }
    } = this.props
    dispatch(await EntriesAction.fetch({ owner, repo, path, branch }))
  }

  render() {
    const {
      contributors,
      entry,
      params: { branch, owner, repo, splat: path = '' }
    } = this.props

    if (entry == null) return null

    const { content, size } = entry
    const lines = [].concat(content.match(/\n/g)).length
    const ext = extname(path).substr(1)
    return (
      <InnerContainer>
        <Panel>
          <Panel.Header info>commit tease</Panel.Header>
          <Panel.Body id="contributors">
            <button>{contributors.length} contributors</button>
            {contributors.map(c => (
              <Link key={c} to={`/${c}`}>
                <img
                  alt={c}
                  style={{
                    verticalAlign: 'middle',
                    width: 20,
                    height: 20,
                    background: '#ccc'
                  }}
                />
              </Link>
            ))}
          </Panel.Body>
        </Panel>
        <Panel>
          <Panel.Header>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                {lines} line | {size} bytes
              </div>
              <div className={styles.fileActions}>
                <SegmentedButtonsContainer>
                  <Button
                    as={Link}
                    // $FlowFixMe
                    small="true"
                    to={`/${owner}/${repo}/raw/${branch}/${path}`}
                  >
                    Raw
                  </Button>
                  <Button
                    as={Link}
                    // $FlowFixMe
                    small="true"
                    to={`/${owner}/${repo}/blame/${branch}/${path}`}
                  >
                    Blame
                  </Button>
                  <Button
                    as={Link}
                    // $FlowFixMe
                    small="true"
                    to={`/${owner}/${repo}/commits/${branch}/${path}`}
                  >
                    History
                  </Button>
                </SegmentedButtonsContainer>
                <form>
                  <button>
                    <i className="fa fa-pencil" />
                  </button>
                </form>
                <form>
                  <button>
                    <i className="fa fa-trash" />
                  </button>
                </form>
              </div>
            </div>
          </Panel.Header>
          <Panel.Body>
            <pre style={{ margin: 0 }}>
              <ul className={styles.lines}>
                {Array.from(Array(lines).keys()).map(i => (
                  <li key={i + 1}>{i + 1}</li>
                ))}
              </ul>
              <code
                className="hljs"
                style={{ backgroundColor: 'white' }}
                dangerouslySetInnerHTML={{
                  __html: getLanguage(ext)
                    ? highlight(ext, content).value
                    : content
                }}
                id="content"
              />
            </pre>
          </Panel.Body>
        </Panel>
      </InnerContainer>
    )
  }
}

export default connect(
  ({ entries }: ReducersStateT, { params: { splat: path } }) => ({
    entry: entries.find(e => (e.path = path))
  })
)(FileContent)
