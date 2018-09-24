// @flow

import { highlight, getLanguage } from 'highlight.js'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import type { Dispatch } from 'redux'
import { extname } from 'path'

import styles from './FileContent.css'
import Button from '../common/atoms/Button'
import InnerContainer from '../common/layouts/InnerContainer'
import SegmentedButtonsContainer from '../common/layouts/SegmentedButtonsContainer'
import * as EntriessAction from '../../ducks/repository/entries'
import panelStyles from '../../styles/panel.css'
import type { EntryT } from '../../../types/gh'

export class RepoFileContent extends React.Component<{
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
    dispatch(await EntriessAction.fetch({ owner, repo, path, branch }))
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
        <div className={panelStyles.panel}>
          <div className={panelStyles.infoPanelHeader}>commit tease</div>
          <div id="contributors" className={panelStyles.panelBody}>
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
          </div>
        </div>
        <div className={panelStyles.panel}>
          <div className={panelStyles.defaultPanelHeader}>
            {lines} line | {size} bytes
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
          <pre>
            <ul className={styles.lines}>
              {(() => {
                const e = []
                for (let i = 0; i < lines; i++) {
                  e.push(<li key={i + 1}>{i + 1}</li>)
                }
                return e
              })()}
            </ul>
            <code
              className="hljs"
              dangerouslySetInnerHTML={{
                __html: getLanguage(ext)
                  ? highlight(ext, content).value
                  : content
              }}
              id="content"
            />
          </pre>
        </div>
      </InnerContainer>
    )
  }
}

export default connect(({ entries }, { params: { splat: path } }) => ({
  entry: entries.find(e => (e.path = path))
}))(RepoFileContent)
