// @flow

import * as React from 'react'
import { jsx, css } from '@emotion/core'
import * as React from 'react'

import Dropdown from './common/blocks/Dropdown'
import Logo from './common/atoms/Logo'
import Modal from './common/Modal'
import type { SessionT } from '../ducks/session'

export default class HeaderWithSession extends React.Component<{
  session: SessionT
}> {
  _addModal: ?Modal
  _profileModal: ?Modal

  render() {
    const { session } = this.props
    const { login } = session
    return (
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          > *:last-child {
            margin-left: auto;
          }
          padding: 12px;
          background-color: #24292e;
          border-bottom: 1px solid #e5e5e5;
          font-size: 13px;

          a {
            color: #fff;
            &:hover {
              text-decoration: none;
              color: rgba(255, 255, 255, 0.75);
            }
          }
        `}
      >
        <Logo href="/">GH</Logo>
        <form
          css={css`
            display: flex;
            align-items: center;
            margin: 0 12px;
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 3px;
            label {
              border-right: 1px solid #ddd;
              padding: 4px 8px;
              color: #767676;
              font-size: 12px;
            }
            input {
              border: none;
              min-height: 26px;
            }
          `}
        >
          <label htmlFor="input-search-query">This repository</label>
          <input id="input-search-query" type="text" placeholder="Search" />
        </form>
        <nav css={headerNavStyles}>
          <ul>
            <li>
              <a to="#">Pull requests</a>
            </li>
            <li>
              <a to="#">Issues</a>
            </li>
          </ul>
        </nav>
        <nav css={headerNavStyles}>
          <ul>
            <li>
              <a href="#">
                <i className="fa fa-bell" />
              </a>
            </li>
            <li>
              <Dropdown
                toggler={
                  <a>
                    <i className="fa fa-plus" />{' '}
                    <i className="fa fa-caret-down" />
                  </a>
                }
              >
                <ul>
                  <li>
                    <a href="/new">New repository</a>
                  </li>
                </ul>
              </Dropdown>
            </li>
            <li>
              <Dropdown
                position="right"
                toggler={
                  <a>
                    <img
                      alt={login}
                      style={{
                        verticalAlign: 'top',
                        width: 20,
                        height: 20,
                        backgroundColor: '#ccc'
                      }}
                    />{' '}
                    <i className="fa fa-caret-down" />
                  </a>
                }
              >
                <ul
                  css={{
                    background: '#ffffff',
                    a: {
                      color: 'initial',
                      '&:hover': {
                        color: 'initial'
                      }
                    }
                  }}
                >
                  <li>
                    <span>Signed in as {login}</span>
                  </li>
                  <li className="Dropdown__divider" />
                  <li>
                    <a href={`/${login}`}>Your profile</a>
                  </li>
                  <li>
                    <a href={`/${login}?tab=stars`}>Your stars</a>
                  </li>
                  <li>
                    <a href="/settings/profile">Setting</a>
                  </li>
                  <li>
                    <a href="/logout">Sign out</a>
                  </li>
                </ul>
              </Dropdown>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

const headerNavStyles = css`
  display: flex;
  align-items: center;
  > ul {
    margin: 0;
    padding: 0;
    list-style: none;
    > li {
      display: inline-block;
      font-weight: bold;
      + li {
        margin-left: 12px;
      }
    }
  }
`
