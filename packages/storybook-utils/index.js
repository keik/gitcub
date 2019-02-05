// @flow

import path from 'path'

const BASE_DIR = '/frontend/components'

export const storyname = (basedir: string, filename: string) =>
  path.relative(
    BASE_DIR,
    path.join(basedir, path.basename(filename, '.stories'))
  )
