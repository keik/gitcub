// @flow

import React from 'react'
import { Link } from 'react-router'
import styled from 'styled-components'

import InnerContainer from '../common/layouts/InnerContainer'

export const Navigations = styled(
  ({
    className,
    issuesCount,
    params,
    pullRequestsCount,
    projectsCount,
    routes,
    session
  }: {
    className: string,
    issuesCount: number,
    params: {
      owner: string,
      repo: string
    },
    pullRequestsCount: number,
    projectsCount: number,
    routes: any,
    session: ?any
  }) => {
    const { owner, repo } = params
    const lastRoutePath = routes[routes.length - 1].path || ''
    return (
      <InnerContainer className={className}>
        <nav className="reponav">
          <ul>
            <li
              className={
                /^($|branches|blob|commit|tree)/.test(lastRoutePath)
                  ? 'selected'
                  : ''
              }
            >
              <Link to={`/${owner}/${repo}`}>
                <i className="fa fa-code" />
                Code
              </Link>
            </li>
            <li className={/^issues/.test(lastRoutePath) ? 'selected' : ''}>
              <Link to={`/${owner}/${repo}/issues`}>
                <i className="fa fa-exclamation-circle" />
                Issues {issuesCount}
              </Link>
            </li>
            <li className={/^pulls/.test(lastRoutePath) ? 'selected' : ''}>
              <Link to={`/${owner}/${repo}/pulls`}>
                <i className="fa fa-code-fork" />
                Pull requests {pullRequestsCount}
              </Link>
            </li>
            <li className={/^projects/.test(lastRoutePath) ? 'selected' : ''}>
              <Link to={`/${owner}/${repo}/projects`}>
                <i className="fa fa-group" />
                Projects {projectsCount}
              </Link>
            </li>
            {session != null && (
              <li className={/^wiki/.test(lastRoutePath) ? 'selected' : ''}>
                <Link to={`/${owner}/${repo}/wiki`}>
                  <i className="fa fa-book" />
                  Wiki
                </Link>
              </li>
            )}
            <li className={/^pulse/.test(lastRoutePath) ? 'selected' : ''}>
              <Link to={`/${owner}/${repo}/pulse`}>
                <i className="fa fa-line-chart" />
                Pulse
              </Link>
            </li>
            <li className={/^graphs/.test(lastRoutePath) ? 'selected' : ''}>
              <Link to={`/${owner}/${repo}/graphs`}>
                <i className="fa fa-bar-chart" />
                Graphs
              </Link>
            </li>
            {session != null && (
              <li className={/^settings/.test(lastRoutePath) ? 'selected' : ''}>
                <Link to={`/${owner}/${repo}/settings`}>
                  <i className="fa fa-gear" />
                  Settings
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </InnerContainer>
    )
  }
)`
  .reponav ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
  }

  .reponav a {
    display: block;
    padding: 7px 15px 8px;
    margin-bottom: -1px;
    color: #666;
  }
  .reponav .selected a {
    background-color: #fff;
    border-left: 1px solid #e5e5e5;
    border-top: 3px solid #d26911;
    border-right: 1px solid #e5e5e5;
  }
  .reponav .fa {
    margin-right: 0.5em;
  }
`

export default Navigations
