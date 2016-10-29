import debug from 'debug'
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import styles from './entries.css'
import { parseEntriesByDirLevel } from '../../../utils'

const d = debug('keik:gh:components:repository:partial:entries')

export default class Entries extends Component {
  static propTypes = {
    entries: PropTypes.arrayOf(PropTypes.shape({
      lastCommit: PropTypes.shape({
        date: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
      }),
    })).isRequired,
    params: PropTypes.shape({
      owner: PropTypes.string.isRequired,
      repo: PropTypes.string.isRequired,
      tree: PropTypes.string,
      splat: PropTypes.string,
    }).isRequired,
  }

  render = () => {
    d('render')
    const { params: { owner, repo, tree='master', splat='' }, entries } = this.props
    const path = splat.replace(/^\//, '')
    return (
      <div>
        <div
          className={styles.commitTease}>
          commit tease
        </div>
        <div
          className={styles.entriesContainer}>
          <table
            className={styles.entries}>
            <tbody>
              {(() => {
                 let parsedEntries = parseEntriesByDirLevel(entries, path)
                 return parsedEntries.map((entry) => {
                   const { path: entryPath, type } = entry
                   return (
                     <tr key={entryPath}>
                       <td className={styles.icon}>
                         <i className={entry.type === 'blob' ? 'fa fa-file-text-o' : 'fa fa-folder-o'} />
                       </td>
                       <td className={styles.name}>
                         <Link to={`/${[owner, repo, type, tree, path, entryPath].filter(Boolean).join('/')}`}>
                           {entryPath}
                         </Link>
                       </td>
                       <td className={styles.commitMessage}>
                         {/* <Link to={`/${owner}/${repo}/commit/${entry.lastCommit.id}`}>
                         {entry.lastCommit.message}
                         </Link> */}
                       </td>
                       <td className={styles.updateAt}>
                         <time-ago datetime={entry.lastCommit.date} />
                       </td>
                     </tr>
                   )
                 })
               })()}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
