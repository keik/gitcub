// @flow

import React from 'react'
import { Link } from 'react-router'
import styled from 'styled-components'

import type {
  BranchObj,
  CommitObj,
  ParentObj,
  TagObj
} from '../../../../types/nodegit'

const NumbersSummary = styled(
  ({
    branches,
    className,
    commits,
    contributorsCount,
    params,
    tags
  }: {
    branches: Array<BranchObj>,
    className: string,
    // $FlowFixMe
    commits: Array<{
      commit: CommitObj,
      parents: Array<ParentObj>,
      sha: string,
      url: string
    }>,
    contributorsCount: number,
    params: {
      owner: string,
      repo: string,
      tree: string,
      splat: string
    },
    tags: Array<TagObj>
  }) => {
    const { owner, repo } = params
    return (
      <ul className={className}>
        <li>
          <Link to={`/${owner}/${repo}/commits`}>
            <i className="fa fa-clock-o" />
            <span>{commits.length}</span> commits
          </Link>
        </li>
        <li>
          <Link to={`/${owner}/${repo}/branches`}>
            <i className="fa fa-code-fork" />
            <span>{branches.length}</span> branches
          </Link>
        </li>
        <li>
          <Link to={`/${owner}/${repo}/releases`}>
            <i className="fa fa-tag" />
            <span>{tags.length}</span> releases
          </Link>
        </li>
        <li>
          <Link to={`/${owner}/${repo}/graphs/contributors`}>
            <i className="fa fa-users" />
            <span>{contributorsCount}</span> contributors
          </Link>
        </li>
      </ul>
    )
  }
)`
  display: flex;
  justify-content: space-around;
  border: 1px solid #ccc;
  border-radius: 3px;
  list-style: none;
  padding: 12px;
  margin: 12px 0 0 0;
}
a {
  color: #767676;
}
 .fa {
  margin-right: 4px;
`

export default NumbersSummary
