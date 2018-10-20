// @flow

import { highlight, getLanguage } from 'highlight.js'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import type { Dispatch } from 'redux'
import { extname } from 'path'

import Button from '../common/atoms/Button'
import Code from '../common/blocks/Code'
import Panel from '../common/blocks/Panel'
import InnerContainer from '../common/layouts/InnerContainer'
import SegmentedButtonsContainer from '../common/layouts/SegmentedButtonsContainer'
import type { ReducersStateT } from '../../ducks'
import * as EntriesAction from '../../ducks/repository/entries'
import type { EntryT } from '../../../types/gh'

export const FileContent = ({
  contributors = [],
  entry,
  params
}: {
  contributors: Array<string>,
  entry: ?EntryT,
  params: {
    branch: string,
    owner: string,
    repo: string,
    splat: string
  }
}) => {
  if (entry == null) return null

  const { content, size } = entry
  const lines = [].concat(content.match(/\n/g)).length
  const ext = extname(params.splat).substr(1)
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
            <div style={{ display: 'flex' }}>
              <SegmentedButtonsContainer>
                <Button
                  as={Link}
                  // $FlowFixMe
                  small="true"
                  to={`/{params.owner}/${params.repo}/raw/${params.branch}/${
                    params.splat
                  }`}
                >
                  Raw
                </Button>
                <Button
                  as={Link}
                  // $FlowFixMe
                  small="true"
                  to={`/${params.owner}/${params.repo}/blame/${params.branch}/${
                    params.splat
                  }`}
                >
                  Blame
                </Button>
                <Button
                  as={Link}
                  // $FlowFixMe
                  small="true"
                  to={`/${params.owner}/${params.repo}/commits/${
                    params.branch
                  }/${params.splat}`}
                >
                  History
                </Button>
              </SegmentedButtonsContainer>
              <button style={{ margin: '0 6px' }}>
                <i className="fa fa-pencil" />
              </button>
              <button>
                <i className="fa fa-trash" />
              </button>
            </div>
          </div>
        </Panel.Header>
        <Panel.Body>
          <Code>
            <Code.Lines>
              {Array.from(Array(lines).keys()).map(i => (
                <li key={i + 1}>{i + 1}</li>
              ))}
            </Code.Lines>
            <Code.Body
              className="hljs"
              dangerouslySetInnerHTML={{
                __html: getLanguage(ext)
                  ? highlight(ext, content).value
                  : content
              }}
              id="content"
            />
          </Code>
        </Panel.Body>
      </Panel>
    </InnerContainer>
  )
}

export default connect(
  ({ entries }: ReducersStateT, { params: { splat: path } }) => ({
    entry: entries.find(e => (e.path = path))
  })
)(
  class FileContentContainer extends React.Component<{
    contributors: Array<string>,
    dispatch: Dispatch<*>,
    entry: ?EntryT,
    params: {
      branch: string,
      owner: string,
      repo: string,
      splat: string
    }
  }> {
    async componentDidMount() {
      const {
        dispatch,
        params: { branch, owner, repo, splat: path = '' }
      } = this.props
      dispatch(await EntriesAction.fetch({ owner, repo, path, branch }))
    }

    render() {
      return <FileContent {...this.props} />
    }
  }
)
