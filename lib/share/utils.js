/**
 * Parse entries by specified directory level
 * @param {object} entries like {'path1': lastCommit: {date: '...', message: '...'}, ...}
 * @param {number} level directory level to parse
 * @returns {object} parsed entries
 */
export function parseEntriesByDirLevel(entries, basedir) {
  const result = Object.keys(entries).reduce((acc, path) => {
    if (!RegExp(`^${basedir}`).test(path))
      return acc

    const p = path.replace(RegExp(`^${basedir}/`), '').split('/')
    const p0 = p[0]

    if (acc[p0] == null) {
      acc[p0] = Object.assign({}, entries[path])
    } else {
      if (new Date(acc[p0].lastCommit.date) < new Date(entries[path].lastCommit.date))
        acc[p0] = entries[path]
    }
    acc[p0].isFile = (p.length === 1)
    return acc
  }, {})
  return result
}
