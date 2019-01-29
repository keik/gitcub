// @flow

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import * as React from 'react'

const Panel = (p: { children: React.Node }) => (
  <div
    css={css`
      position: relative;
      border: 1px solid #d8d8d8;
      border-radius: 3px;
      margin-bottom: 24px;
    `}
  >
    {p.children}
  </div>
)

const Header = (p: { children: React.Node, info?: true, noPadding?: true }) => (
  <div
    css={css`
      padding: ${p.noPadding ? 0 : '12px'};
      background-color: ${p.info ? '#f2f9fc' : '#f7f7f7'};
      border-bottom: 1px solid;
      border-color: ${p.info ? '#c9e6f2' : '#d8d8d8'};
    `}
  >
    {p.children}
  </div>
)
Panel.Header = Header

const Body = (p: { children: React.Node, noPadding?: true }) => (
  <div
    css={css`
      padding: ${p.noPadding ? 0 : '12px'};
      background-color: #fff;
      > table {
        width: 100%;
        border-collapse: collapse;
        line-height: 20px;
        > tbody {
          > tr {
            &:first-of-type td {
              border: none;
            }
            > td {
              padding: 6px 3px;
              border-top: 1px solid #eee;
              color: #888;
            }
          }
        }
      }
    `}
  >
    {p.children}
  </div>
)
Panel.Body = Body

export default Panel
