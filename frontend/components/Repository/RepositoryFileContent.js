// @flow

import { extname } from 'path'

import type { EntryT } from 'gh-types/gh'
import { highlight, getLanguage } from 'highlight.js'
import * as React from 'react'
import { connect } from 'react-redux'
import { Link, type Match } from 'react-router-dom'
import type { Dispatch } from 'redux'

import rootReducer from '../../ducks'
import * as EntriesAction from '../../ducks/repository/entries'
import Button from '../common/atoms/Button'
import Code from '../common/blocks/Code'
import Panel from '../common/blocks/Panel'
import SegmentedButtonsContainer from '../common/layouts/SegmentedButtonsContainer'

type Props = {|
  contributors: $ReadOnlyArray<string>,
  entry: ?EntryT,
  match: $Shape<
    Match<{
      owner: string,
      repo: string,
      branch: string,
      path: string
    }>
  >
|}

export const RepositoryFileContent = ({
  contributors = [],
  entry,
  match: { params }
}: Props) => {
  if (entry == null) return null

  const { content, size } = entry
  const lines = [].concat(content.match(/\n/g)).length
  const ext = extname(params.path || '').substr(1)
  return (
    <div>
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
                  to={`/{params.owner}/${params.repo}/raw/${
                    params.branch
                  }/${params.path || ''}`}
                >
                  Raw
                </Button>
                <Button
                  as={Link}
                  // $FlowFixMe
                  small="true"
                  to={`/${params.owner}/${params.repo}/blame/${
                    params.branch
                  }/${params.path || ''}`}
                >
                  Blame
                </Button>
                <Button
                  as={Link}
                  // $FlowFixMe
                  small="true"
                  to={`/${params.owner}/${params.repo}/commits/${
                    params.branch
                  }/${params.path || ''}`}
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
    </div>
  )
}

export default RepositoryFileContent

export const RepositoryFileContentContainer = connect<_, _, *, _, *, _>(
  (
    { entries }: $Call<typeof rootReducer>,
    {
      match: {
        params: { path }
      }
    }: Props
  ) => ({
    entry: entries.find(e => (e.path = path))
  })
)(
  class $RepositoryFileContentContainer extends React.Component<{|
    ...Props,
    dispatch: Dispatch<*>
  |}> {
    async componentDidMount() {
      const {
        dispatch,
        match: {
          params: { branch, owner, repo, path: path = '' }
        }
      } = this.props
      dispatch(await EntriesAction.fetch({ owner, repo, path, branch }))
    }

    render() {
      return (
        <RepositoryFileContent
          contributors={[]}
          entry={this.props.entry}
          match={this.props.match}
        />
      )
    }
  }
)
