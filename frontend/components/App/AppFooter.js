// @flow

import * as React from 'react'
import { css } from 'styled-components'

import Logo from '../common/atoms/Logo'
import InnerContainer from '../common/layouts/InnerContainer'

const Footer = () => (
  <InnerContainer>
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 24px 0;
        margin-top: 36px;
        border-top: 1px solid #eee;
        color: #767676;
        font-size: 12px;
        > ul {
          list-style: none;
          padding: 0;
          margin: 0;
          > li {
            display: inline-block;
            + li {
              margin-left: 10px;
            }
          }
        }
      `}
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

export default Footer
