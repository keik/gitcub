// @flow

import config from '../../config'

import type { Tree$Entry$WithLastCommitT } from '../types/gh'

let { HOST, PORT } = config.env[process.env.NODE_ENV || 'development']
PORT = process.env.PORT || PORT
const ROOT_URL = typeof window === 'undefined' ? `http://${HOST}:${PORT}` : ''

/**
 * Parse entries by specified directory level
 * @param {array<object>} array of entries like [{path: 'path1': lastCommit: {date: '...', message: '...', ...}, ...]
 * @param {string} basedir base directory to parse
 * @returns {array<object>} parsed entries
 */
export function parseEntriesByDirLevel(
  entries: Array<Tree$Entry$WithLastCommitT>,
  basedir: string
) {
  return entries.reduce((acc, entry) => {
    const path = entry.path
    if (!RegExp(`^${basedir}`).test(path)) return acc

    const p = path.replace(RegExp(`^${basedir}/`), '').split('/')
    const p0 = p[0]
    entry = Object.assign({}, entry, {
      path: p0,
      type: p.length === 1 ? 'blob' : 'tree'
    })
    const exist = acc.find(e => e.path === p0)
    if (!exist) {
      acc.push(entry)
    } else if (entry.lastCommit.author.date > exist.lastCommit.author.date) {
      Object.assign(exist, entry)
    }
    return acc
  }, [])
}

/**
 * TODO
 */
export function genAPIStr(API_STR: string, values: any) {
  const keys = Object.keys(values)
  return (
    ROOT_URL +
    keys
      .reduce(
        (acc, key) =>
          acc.replace(
            RegExp(`(\\()?\\/:${key !== '*' ? key : '\\*'}(\\)\\?)?`),
            `/${values[key]}`
          ),
        API_STR
      )
      .replace(/\??\*/, values['*'])
      .replace(/(\(\/:[^/]+)/g, '')
  )
}
