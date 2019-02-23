// @flow

import * as React from 'react'
import { css } from 'styled-components'
import { Link } from 'react-router-dom'

import Panel from '../../common/blocks/Panel'
import { parseEntriesByDirLevel } from '../../../../shared/utils'
import type { Tree$Entry$WithLastCommitT } from 'gh-types/gh'

const Entries = ({
  entries,
  params
}: {
  entries: $ReadOnlyArray<Tree$Entry$WithLastCommitT>,
  params: {
    owner: string,
    repo: string,
    tree?: string,
    path?: string
  }
}) => {
  const { owner, repo, tree = 'master' } = params
  if (entries.length === 0) return <p>No entries.</p>

  const path = (params.path || '').replace(/^\//, '')
  const filteredEntries = parseEntriesByDirLevel(entries, path)
  const latestCommit = filteredEntries.reduce((acc, e) =>
    e.lastCommit.author.date > acc.lastCommit.author.date ? e : acc
  ).lastCommit
  return (
    <div>
      <Panel>
        <Panel.Header info>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <img
                alt={latestCommit.author.name}
                syle={{
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
                css={css`
                  font-family: Consolas, 'Liberation Mono', Menlo, Courier,
                    monospace;
                  font-size: 90%;
                  color: #445055;
                `}
                to={`/${owner}/${repo}/commit/${latestCommit.sha}`}
              >
                {latestCommit.sha.substr(0, 7)}
              </Link>
              &nbsp;
              <time-ago datetime={latestCommit.author.date} />
            </div>
          </div>
        </Panel.Header>
        <Panel.Body noPadding>
          <table>
            <tbody>
              {filteredEntries.map(entry => (
                <tr key={entry.path}>
                  <td
                    css={css`
                      width: 18px;
                    `}
                  >
                    <i
                      css={css`
                        padding-left: 12px;
                      `}
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
                  <td
                    css={css`
                      padding-left: 12px;
                    `}
                  >
                    <Link
                      css={css`
                        color: #888;
                      `}
                      to={`/${owner}/${repo}/commit/${entry.lastCommit.sha}`}
                    >
                      {entry.lastCommit.message}
                    </Link>
                  </td>
                  <td
                    css={css`
                      width: 120px;
                      text-align: right;
                    `}
                  >
                    <span
                      css={css`
                        padding-right: 12px;
                      `}
                    >
                      <time-ago datetime={entry.lastCommit.author.date} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel.Body>
      </Panel>
    </div>
  )
}

export default Entries
