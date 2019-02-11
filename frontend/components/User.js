// @flow

import * as React from 'react'

import InnerContainer from './common/layouts/InnerContainer'

const User = () => (
  <InnerContainer>
    <div
      css={{
        display: 'flex',
        paddingRight: '16px'
      }}
    >
      <div css={{ width: '25%' }}>
        <div
          css={({ theme: { border, borderRadius } }) => ({
            border,
            borderRadius
          })}
        >
          hoge
        </div>
        <img
          alt="avator"
          style={{
            width: 233,
            height: 233,
            borderRadius: 6,
            backgroundColor: '#ccc'
          }}
        />
        <div>
          <div>NAME</div>
          <div>ID</div>
          <div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li>PROF</li>
              <li>PROF</li>
              <li>PROF</li>
            </ul>
          </div>
          <div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li>
                <img
                  alt="ORG"
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: 3,
                    backgroundColor: '#ccc'
                  }}
                />
              </li>
              <li>
                <img
                  alt="ORG"
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: 3,
                    backgroundColor: '#ccc'
                  }}
                />
              </li>
              <li>
                <img
                  alt="ORG"
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: 3,
                    backgroundColor: '#ccc'
                  }}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div css={{ width: '75%' }}>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li>Overview</li>
            <li>Repositories</li>
            <li>Stars</li>
            <li>Followers</li>
            <li>Following</li>
          </ul>
        </nav>
        <div>
          <h2>Pinned repositories</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li>REPO</li>
            <li>REPO</li>
            <li>REPO</li>
            <li>REPO</li>
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
