/**
 * Parse entries by specified directory level
 * @param {object} entries like {'path1': lastCommit: {date: '...', message: '...'}, ...}
 * @param {number} level directory level to parse
 * @returns {object} parsed entries
 */
export function parseEntriesByDirLevel(entries, level) {
  const result = Object.keys(entries).reduce((acc, path) => {
    const d = path.split('/')
    const basedir = d[level]
    if (!basedir || d.length < level + 1)
      return acc
    if (acc[basedir] == null) {
      acc[basedir] = Object.assign({}, entries[path])
    } else {
      if (new Date(acc[basedir].lastCommit.date) < new Date(entries[path].lastCommit.date))
        acc[basedir] = entries[path]
    }
    acc[basedir].isFile = d.length === level + 1
    return acc
  }, {})
  return result
}
