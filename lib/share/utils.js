/**
 * Parse entries by specified directory level
 * @param {array<object>} array of entries like [{path: 'path1': lastCommit: {date: '...', message: '...', ...}, ...]
 * @param {string} basedir base directory to parse
 * @returns {array<object>} parsed entries
 */
export function parseEntriesByDirLevel(entries, basedir) {
  return entries.reduce((acc, entry) => {
    const path = entry.path
    if (!RegExp(`^${basedir}`).test(path))
      return acc

    const p = path.replace(RegExp(`^${basedir}/`), '').split('/')
    const p0 = p[0]
    entry = Object.assign({}, entry, {path: p0, type: p.length === 1 ? 'blob' : 'tree'})
    if (!acc.some(e => e.path === p0)) {
      acc.push(entry)
    } else if (new Date(entry.lastCommit.date) > new Date(acc[p0])) {
      acc[p0] = entry
    }
    return acc
  }, [])
}
