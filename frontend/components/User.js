// @flow

import * as React from 'react'
import { GoLink, GoLocation, GoMail, GoOrganization } from 'react-icons/go'

import InnerContainer from './common/layouts/InnerContainer'

const User = () => (
  <InnerContainer>
    <div
      css={({ theme: { spaces } }) => ({
        display: 'flex',
        marginTop: spaces[2]
      })}
    >
      <div css={{ width: '25%', marginRight: '16px' }}>
        <div
          css={({ theme: { border, borderRadius } }) => ({
            border,
            borderRadius
          })}
        >
          <img
            alt="avator"
            css={{
              display: 'block',
              width: '240px',
              height: '240px',
              backgroundColor: '#ccc'
            }}
          />
        </div>
        <div>
          <h1>
            <div
              css={{
                fontSize: '26px'
              }}
            >
              %NAME%
            </div>
            <div
              css={{
                color: '#666666',
                fontSize: '20px',
                fontWeight: '300'
              }}
            >
              %ID%
            </div>
          </h1>
          <div>
            <div
              css={({ theme: { spaces } }) => ({
                marginTop: spaces[2]
              })}
            >
              %BIO%
            </div>
            <ul
              css={({ theme: { spaces } }) => ({
                display: 'flex',
                flexDirection: 'column',
                listStyle: 'none',
                padding: 0,
                margin: `${spaces[2]} 0 0 0`,
                '> li': {
                  marginBottom: spaces[0]
                }
              })}
            >
              <li>
                <GoOrganization />
                %ORGANZATION%
              </li>
              <li>
                <GoLocation />
                %LOCATION%
              </li>
              <li>
                <GoMail />
                %EMAIL%
              </li>
              <li>
                <GoLink />
                %LINK%
              </li>
            </ul>
            <button>Edit</button>
          </div>
          <hr />
          <div>
            <h2 css={{ fontSize: '16px' }}>Organizations</h2>
            <ul
              css={({ theme: { borderRadius, spaces } }) => ({
                display: 'flex',
                listStyle: 'none',
                padding: 0,
                margin: 0,
                '> li': {
                  marginRight: spaces[0],
                  '> img': {
                    display: 'block',
                    width: '36px',
                    height: '36px',
                    borderRadius: borderRadius,
                    backgroundColor: '#ccc'
                  }
                }
              })}
            >
              <li>
                <img alt="ORG" />
              </li>
              <li>
                <img alt="ORG" />
              </li>
              <li>
                <img alt="ORG" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div css={{ width: '75%' }}>
        <nav css={({ theme: { border } }) => ({ borderBottom: border })}>
          <ul
            css={({ theme: { spaces } }) => ({
              display: 'flex',
              listStyle: 'none',
              padding: 0,
              margin: 0,
              '> li': {
                marginRight: spaces[2],
                '> a': {
                  display: 'block',
                  padding: `${spaces[2]} ${spaces[1]}`
                }
              }
            })}
          >
            <li>
              <a href="#">Overview</a>
            </li>
            <li>
              <a href="#">Repositories</a>
            </li>
            <li>
              <a href="#">Stars</a>
            </li>
            <li>
              <a href="#">Followers</a>
            </li>
            <li>
              <a href="#">Following</a>
            </li>
          </ul>
        </nav>
        <div>
          <h2>Pinned repositories</h2>
          <ul
            css={({ theme: { border, borderRadius } }) => ({
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              listStyle: 'none',
              padding: 0,
              margin: 0,
              '> li': {
                border,
                borderRadius,
                width: '49%' // WIP
              }
            })}
          >
            <li>
              <h3>%REPO_NAME%</h3>
              <p>%REPO_DESCRIPTION%</p>
            </li>
            <li>
              <h3>%REPO_NAME%</h3>
              <p>%REPO_DESCRIPTION%</p>
            </li>
            <li>
              <h3>%REPO_NAME%</h3>
              <p>%REPO_DESCRIPTION%</p>
            </li>
            <li>
              <h3>%REPO_NAME%</h3>
              <p>%REPO_DESCRIPTION%</p>
            </li>
            <li>
              <h3>%REPO_NAME%</h3>
              <p>%REPO_DESCRIPTION%</p>
            </li>
          </ul>
        </div>
        <div>
          <h2>N contributions in the last year</h2>
          <div>GRAPH</div>
        </div>
      </div>
    </div>
  </InnerContainer>
)

export default User
