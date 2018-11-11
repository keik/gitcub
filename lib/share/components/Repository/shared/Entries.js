// @flow

import * as React from 'react'
import { Link, type Match } from 'react-router-dom'
import styled from 'styled-components'

import Panel from '../../common/blocks/Panel'
import { parseEntriesByDirLevel } from '../../../utils'
import type { Tree$Entry$WithLastCommitT } from '../../../../types/gh'

type Props = {
  entries: Array<Tree$Entry$WithLastCommitT>,
  params: {
    owner: string,
    repo: string,
    tree?: string,
    path?: string
  }
}
export const Entries: React.StatelessFunctionalComponent<Props> = styled(
  ({ className, entries, match: { params } }: *) => {
    const { owner, repo, tree = 'master' } = params
    if (entries.length === 0) return <p>No entries.</p>

    const path = (params.path || '').replace(/^\//, '')
    const filteredEntries = parseEntriesByDirLevel(entries, path)
    const latestCommit = filteredEntries.reduce(
      (acc, e) =>
        e.lastCommit.author.date > acc.lastCommit.author.date ? e : acc
    ).lastCommit

    return (
      <Panel className={className}>
        <Panel.Header info>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <img
                alt={latestCommit.author.name}
                style={{
                  verticalAlign: 'middle',
                  width: 20,
                  height: 20,
                  background: '#ccc'
                }}
              />
              &nbsp;
              <a href={`/${latestCommit.author.name}`}>
                {latestCommit.author.name}
              </a>
              &nbsp;
              <Link to={`/${owner}/${repo}/commit/${latestCommit.sha}`}>
                {latestCommit.message}
              </Link>
            </div>
            <div>
              Latest commit&nbsp;
              <Link
                className="sha"
                to={`/${owner}/${repo}/commit/${latestCommit.sha}`}
              >
                {latestCommit.sha.substr(0, 7)}
              </Link>
              &nbsp;
              <time-ago datetime={latestCommit.author.date} />
            </div>
          </div>
        </Panel.Header>
        <Panel.Body>
          <table>
            <tbody>
              {filteredEntries.map(entry => (
                <tr key={entry.path}>
                  <td className="icon">
                    <i
                      className={
                        entry.type === 'blob'
                          ? 'fa fa-file-text-o'
                          : 'fa fa-folder-o'
                      }
                    />
                  </td>
                  <td className="name">
                    <Link
                      to={`/${[owner, repo, entry.type, tree, path, entry.path]
                        .filter(Boolean)
                        .join('/')}`}
                    >
                      {entry.path}
                    </Link>
                  </td>
                  <td className="commitMessage">
                    <Link
                      to={`/${owner}/${repo}/commit/${entry.lastCommit.sha}`}
                    >
                      {entry.lastCommit.message}
                    </Link>
                  </td>
                  <td className="updateAt">
                    <time-ago datetime={entry.lastCommit.author.date} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel.Body>
      </Panel>
    )
  }
)`
  table tr td.icon {
    width: 18px;
    padding-left: 12px;
  }

  table tr td.commitMessage {
    padding-left: 12px;
  }

  table tr td.commitMessage a {
    color: #888;
  }

  table tr td.updateAt {
    width: 120px;
    padding-right: 12px;
    text-align: right;
  }

  .sha {
    font-family: Consolas, 'Liberation Mono', Menlo, Courier, monospace;
    font-size: 90%;
    color: #445055;
  }
`
