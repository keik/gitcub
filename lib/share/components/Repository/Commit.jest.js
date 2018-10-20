// @flow

import * as React from 'react'
import renderer from 'react-test-renderer'

import { Commit } from './Commit'

test('<Commit /> snapshot', () => {
  const tree = renderer
    .create(
      <Commit
        commit={{
          commit: {
            author: {
              date: '$DATE',
              name: '$NAME'
            },
            sha: '$SHA',
            message: '$MESSAGE,'
          },
          files: [
            {
              additions: 10,
              blob_url: '$BLOB_URL',
              changes: 11,
              contents_url: '$CONTENTS_URL',
              deletions: 12,
              filename: '$FILENAME',
              patch: '$PATCH',
              raw_url: '$RAW_URL',
              sha: '$SHA',
              status: '$STATUS'
            }
          ],
          html_url: '$HTML_URL',
          parents: [],
          sha: '$SHA',
          stats: {
            additions: 10,
            deletions: 12,
            total: 22
          },
          url: '$URL'
        }}
        params={{ owner: '$OWNER', repo: '$REPO', sha: '$SHA' }}
        parents={[
          {
            sha: '$PARENT_SHA_1'
          },
          {
            sha: '$PARENT_SHA_2'
          }
        ]}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
