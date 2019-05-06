// @flow

import * as React from 'react'

import Logo from '../common/atoms/Logo'
import InnerContainer from '../common/layouts/InnerContainer'

const AppFooter = () => (
  <InnerContainer>
    <div
      css={({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `${theme.space[3]} 0`,
        marginTop: theme.space[4],
        borderTop: '1px solid #eee',
        color: '#767676',
        fontSize: '12px',
        '> ul': {
          listStyle: 'none',
          padding: 0,
          margin: 0,
          '> li': {
            display: 'inline-block',
            '+ li': {
              marginLeft: theme.space[2]
            }
          }
        }
      })}
    >
      <ul>
        <li>&copy; 2016 keik</li>
        <li>
          <a href="#">Help</a>
        </li>
      </ul>
      <Logo href="#">GH</Logo>
      <ul>
        <li>
          <a href="#">API</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
      </ul>
    </div>
  </InnerContainer>
)

export default AppFooter
