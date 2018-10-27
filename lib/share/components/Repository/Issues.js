// @flow

import React from 'react'
import { Link } from 'react-router'
import styled from 'styled-components'

import Button from '../common/atoms/Button'
import SegmentedButtonsContainer from '../common/layouts/SegmentedButtonsContainer'

import type { IssueObj } from '../../../types/nodegit'

export const Issues = styled(
  ({
    className,
    issues = [],
    params
  }: {
    className: string,
    issues: Array<IssueObj>,
    params: {
      owner: string,
      repo: string
    }
  }) => (
    <div className={className}>
      <div className="subnav">
        <div className="filter">
          <Button small>Filters</Button>
          <form>
            <i className="fa fa-search" />
            <input />
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

      <div className="issuesHeader">
        <div>
          <Link
            to={`/${params.owner}/${params.repo}/issues?q=is:open is:issue`}
          >
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
      <ul className="issues">
        {issues.map(issue => (
          <li key={issue.id} className="issue">
            <div className="icon">
              <i className="fa fa-exclamation-circle" />
            </div>
            <div className="main">
              <div className="title">
                <Link to={`/${params.owner}/${params.repo}/issues/${issue.id}`}>
                  {issue.title}
                </Link>
              </div>
              <div className="sub">
                <span>#{issue.id}</span> opened{' '}
                <time-ago datetime={issue.createdAt} /> by{' '}
                <Link to={`/${issue.createdBy}`}>{issue.createdBy}</Link>
              </div>
            </div>
            <div className="comments">
              {issue.commentsCount > 0 ? (
                <div>
                  <Link
                    to={`/${params.owner}/${params.repo}/issues/${issue.id}`}
                  >
                    <i className="fa fa-comment-o" /> {issue.commentsCount}
                  </Link>
                </div>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
)`
  .subnav > * {
    display: inline-block;
    margin-right: 12px;
  }

  .filter {
    display: inline-block;
  }
  .filter:after {
    content: ' ';
    display: table;
    clear: both;
  }
  .filter button {
    padding: 6px 10px;
    border-radius: 3px 0 0 3px;
  }
  .filter form {
    margin-left: -1px;
    position: relative;
    display: inline-block;
  }
  .filter form i {
    position: absolute;
    top: 10px;
    left: 6px;
  }
  .filter input {
    width: 320px;
    padding: 6px 10px 6px 32px;
    color: #767676;
    border: 1px solid #d5d5d5;
    border-radius: 0 3px 3px 0;
    line-height: 20px;
  }

  .issuesHeader {
    position: relative;
    padding: 12px 12px;
    margin-top: 20px;
    background-color: #f8f8f8;
    border: 1px solid #e5e5e5;
    border-radius: 3px 3px 0 0;
  }

  .issuesHeader > * {
    display: inline-block;
    margin-right: 12px;
  }

  .issues {
    list-style: none;
    padding: 0;
    margin: 0;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    border-left: 1px solid #eee;
  }

  .issue {
    padding: 12px 12px;
    border-top: 1px solid #eee;
  }
  .issue:first-child {
    border-top: none;
  }
  .issue:after {
    content: ' ';
    display: table;
    clear: both;
  }

  .issue .icon {
    float: left;
    color: #6cc644;
  }

  .issue .main {
    float: left;
    margin-left: 12px;
  }
  .issue .main .title {
    color: #333;
    font-size: 16px;
  }
  .issue .main .sub {
    font-size: 12px;
  }

  .issue .comments {
    float: right;
  }
`

export default Issues
