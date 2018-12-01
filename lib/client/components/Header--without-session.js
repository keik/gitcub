// @flow

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

import ButtonsContainer from './common/layouts/ButtonsContainer'
import Button from './common/atoms/Button'
import Logo from './common/atoms/Logo'

export default function HeaderWithoutSession() {
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

        &:after {
          content: '';
          display: table;
          clear: both;
        }
      `}
    >
      <div>
        <Logo href="/">GH</Logo>
      </div>
      <form
        css={css`
          float: left;
          display: flex;
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
        <label htmlFor="input-search-query">
          <input placeholder="Search or jump to..." />
        </label>
      </form>
      <ButtonsContainer>
        <Button as="a" small href="/login">
          Sign in
        </Button>
        <Button as="a" primary small href="/join">
          Sign up
        </Button>
      </ButtonsContainer>
    </div>
  )
}
