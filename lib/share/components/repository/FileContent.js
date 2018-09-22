// @flow

import debug from 'debug'
import { highlight, getLanguage } from 'highlight.js'
import React from 'react'
import { Link } from 'react-router'
import { extname } from 'path'

import styles from './FileContent.css'
import btnStyles from '../../styles/btn.css'
import panelStyles from '../../styles/panel.css'

const d = debug('keik:gh:components:repository:file-content')

export default class RepoFileContent extends React.Component<{
  params: {
    branch: string,
    owner: string,
    repo: string,
    splat: string
  },
  content: string,
  contributors: Array<string>,
  size: number
}> {
  static defaultProps = {
    contributors: ['a', 'b', 'c']
  }

  render() {
    d('render')
    const {
      params: { branch, owner, repo, splat: path = '' },
      content,
      size,
      contributors
    } = this.props
    const lines = [].concat(content.match(/\n/g)).length
    const ext = extname(path).substr(1)
    return (
      <div className={styles.container}>
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
              <div className={btnStyles.group}>
                <Link
                  className={btnStyles.defaultSmBtn}
                  to={`/${owner}/${repo}/raw/${branch}/${path}`}
                >
                  Raw
                </Link>
                <Link
                  className={btnStyles.defaultSmBtn}
                  to={`/${owner}/${repo}/blame/${branch}/${path}`}
                >
                  Blame
                </Link>
                <Link
                  className={btnStyles.defaultSmBtn}
                  to={`/${owner}/${repo}/commits/${branch}/${path}`}
                >
                  History
                </Link>
              </div>
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
      </div>
    )
  }
}
