// @flow

import React from 'react'
import { Link } from 'react-router'

export default function Breadcrumbs({
  params
}: {
  params: {
    owner: string,
    repo: string,
    tree: string,
    splat: string
  }
}) {
  const { owner, repo, tree = 'master', splat = '' } = params
  const path = splat.replace(/^\//, '')
  return (
    <div>
      <strong>
        <Link key={repo} to={`/${owner}/${repo}/tree/${tree}`}>
          {repo}
        </Link>
      </strong>
      <span key={`${repo}/`} style={{ margin: '0 6px' }}>
        /
      </span>
      {path.split('/').map((dir, i, dirs) => (
        <React.Fragment key={i}>
          {i === dirs.length - 1 ? (
            <strong key={dir}>{dir}</strong>
          ) : (
            <Link
              key={dir}
              to={`/${owner}/${repo}/tree/${tree}/${[...dirs]
                .splice(0, i + 1)
                .join('/')}`}
            >
              {dir}
            </Link>
          )}
          <span key={`${dir}/`} style={{ margin: '0 6px' }}>
            /
          </span>
        </React.Fragment>
      ))}
    </div>
  )
}
