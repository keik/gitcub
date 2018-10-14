// @flow

import React from 'react'
import { Link } from 'react-router'

import Panel from '../../common/blocks/Panel'
import styles from './Entries.css'
import { parseEntriesByDirLevel } from '../../../utils'

import type { TreeEntryObj } from '../../../../types/nodegit'

export default function Entries({
  entries,
  params
}: {
  // $FlowFixMe
  entries: Array<TreeEntryObj>,
  params: {
    owner: string,
    repo: string,
    tree: string,
    splat: string
  }
}) {
  const { owner, repo, tree = 'master', splat = '' } = params
  if (entries.length === 0) return <p>No entries.</p>

  const path = splat.replace(/^\//, '')
  const filteredEntries = parseEntriesByDirLevel(entries, path)
  const latestCommit = filteredEntries.reduce(
    (acc, e) =>
      e.lastCommit.author.date > acc.lastCommit.author.date ? e : acc
  ).lastCommit

  return (
    <Panel>
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
              className={styles.sha}
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
                <td className={styles.icon}>
                  <i
                    className={
                      entry.type === 'blob'
                        ? 'fa fa-file-text-o'
                        : 'fa fa-folder-o'
                    }
                  />
                </td>
                <td className={styles.name}>
                  <Link
                    to={`/${[owner, repo, entry.type, tree, path, entry.path]
                      .filter(Boolean)
                      .join('/')}`}
                  >
                    {entry.path}
                  </Link>
                </td>
                <td className={styles.commitMessage}>
                  <Link to={`/${owner}/${repo}/commit/${entry.lastCommit.sha}`}>
                    {entry.lastCommit.message}
                  </Link>
                </td>
                <td className={styles.updateAt}>
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
