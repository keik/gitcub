// @flow

import type { IssueObj } from 'gh-types/nodegit'
import * as React from 'react'
import { Link, type Match } from 'react-router-dom'
import { css } from 'styled-components'

import Button from '../common/atoms/Button'
import SegmentedButtonsContainer from '../common/layouts/SegmentedButtonsContainer'

const RepositoryIssues = ({
  issues = [],
  match: { params }
}: {|
  issues: $ReadOnlyArray<IssueObj>,
  match: $Shape<
    Match<{
      owner: string,
      repo: string
    }>
  >
|}) => (
  <div>
    <div
      css={css`
        > * {
          display: inline-block;
          margin-right: 12px;
        }
      `}
    >
      <div
        css={css`
          display: inline-block;
        `}
      >
        <Button
          small
          css={css`
            padding: 6px 10px;
            border-radius: 3px 0 0 3px;
          `}
        >
          Filters
        </Button>
        <form
          css={css`
            margin-left: -1px;
            position: relative;
            display: inline-block;
            > i {
              position: absolute;
              top: 10px;
              left: 6px;
            }
          `}
        >
          <i className="fa fa-search" />
          <input
            css={css`
              width: 320px;
              padding: 6px 10px 6px 32px;
              color: #767676;
              border: 1px solid #d5d5d5;
              border-radius: 0 3px 3px 0;
              line-height: 20px;
            `}
          />
        </form>
      </div>
      <SegmentedButtonsContainer>
        <Button
          as={Link}
          to={`/${params.owner}/${params.repo}/labels`}
          // $FlowFixMe
          transparent="true"
        >
          Labels
        </Button>
        <Button
          as={Link}
          to={`/${params.owner}/${params.repo}/milestones`}
          // $FlowFixMe
          transparent="true"
        >
          Milestones
        </Button>
      </SegmentedButtonsContainer>
    </div>

    <div
      css={css`
        position: relative;
        padding: 12px 12px;
        margin-top: 20px;
        background-color: #f8f8f8;
        border: 1px solid #e5e5e5;
        border-radius: 3px 3px 0 0;
        > * {
          display: inline-block;
          margin-right: 12px;
        }
      `}
    >
      <div>
        <Link to={`/${params.owner}/${params.repo}/issues?q=is:open is:issue`}>
          <i className="fa fa-exclamation-circle" /> {issues.length} Open
        </Link>
      </div>
      <div>
        <Link
          to={`/${params.owner}/${params.repo}/issues?q=is:closed is:issue`}
        >
          <i className="fa fa-check" /> {-1} Closed
        </Link>
      </div>
    </div>
    <ul
      css={css`
        list-style: none;
        padding: 0;
        margin: 0;
        border-right: 1px solid #eee;
        border-bottom: 1px solid #eee;
        border-left: 1px solid #eee;
      `}
    >
      {issues.map(issue => (
        <li
          key={issue.id}
          css={css`
            padding: 12px 12px;
            border-top: 1px solid #eee;
            &:first-of-type {
              border-top: none;
            }
            &:after {
              content: ' ';
              display: table;
              clear: both;
            }
          `}
        >
          <div
            css={css`
              float: left;
              color: #6cc644;
            `}
          >
            <i className="fa fa-exclamation-circle" />
          </div>
          <div
            css={css`
              float: left;
              margin-left: 12px;
            `}
          >
            <div
              css={css`
                color: #333;
                font-size: 16px;
              `}
            >
              <Link to={`/${params.owner}/${params.repo}/issues/${issue.id}`}>
                {issue.title}
              </Link>
            </div>
            <div
              css={css`
                font-size: 12px;
              `}
            >
              <span>#{issue.id}</span> opened{' '}
              <time-ago datetime={issue.createdAt} /> by{' '}
              <Link to={`/${issue.createdBy}`}>{issue.createdBy}</Link>
            </div>
          </div>
          <div
            css={css`
              float: right;
            `}
          >
            {issue.commentsCount > 0 && (
              <div>
                <Link to={`/${params.owner}/${params.repo}/issues/${issue.id}`}>
                  <i className="fa fa-comment-o" /> {issue.commentsCount}
                </Link>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  </div>
)

export default RepositoryIssues
