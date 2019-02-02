// @flow

import * as React from 'react'
import { css } from 'styled-components'

import InnerContainer from './common/layouts/InnerContainer'
import Logo from './common/atoms/Logo'

export default function HeaderWithoutSession() {
  return (
    <div
      css={css`
        padding: 16px 0;
        background-color: #24292e;
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
      <InnerContainer
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          '> *:lastChild': {
            marginLeft: 'auto'
          }
        }}
      >
        <Logo href="/">GH</Logo>
        <div
          css={{
            display: 'flex',
            alignItems: 'center',
            '> *:not(:last-child)': { marginRight: '16px' }
          }}
        >
          <form
            css={css`
              display: flex;
              background-color: hsla(0, 0%, 100%, 0.125);
              border-radius: 3px;
              input {
                border: none;
                min-height: 26px;
              }
            `}
          >
            <label>
              <input
                css={{
                  padding: '8px',
                  background: 'none'
                }}
                placeholder="Search"
              />
            </label>
          </form>
          <a
            css={{
              padding: '4px 8px',
              backgroundColor: 'transparent',
              fontSize: '16px',
              lineHeight: '24px'
            }}
            href="/login"
          >
            Sign in
          </a>
          <a
            css={{
              padding: '4px 8px',
              backgroundColor: 'transparent',
              border: '1px solid #e1e4e8',
              borderRadius: '3px',
              fontSize: '16px',
              lineHeight: '24px'
            }}
            href="/join"
          >
            Sign up
          </a>
        </div>
      </InnerContainer>
    </div>
  )
}
