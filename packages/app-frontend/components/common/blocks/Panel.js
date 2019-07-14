// @flow

import css from '@styled-system/css'
import * as React from 'react'

const Panel = (p: { children: React.Node }) => (
  <div
    css={css({
      position: 'relative',
      border: '1px solid #d8d8d8',
      borderRadius: '3px',
      mb: 3
    })}
  >
    {p.children}
  </div>
)

const Header = (p: { children: React.Node, info?: true, noPadding?: true }) => (
  <div
    css={css({
      p: p.noPadding ? 0 : 2,
      backgroundColor: p.info ? '#f2f9fc' : '#f7f7f7',
      borderBottom: '1px solid',
      borderColor: p.info ? '#c9e6f2' : '#d8d8d8'
    })}
  >
    {p.children}
  </div>
)
Panel.Header = Header

const Body = (p: { children: React.Node, noPadding?: true }) => (
  <div
    css={css({
      p: p.noPadding ? 0 : 2,
      backgroundColor: '#fff',
      '> table': {
        width: '100%',
        borderCollapse: 'collapse',
        lineHeight: '20px',
        '> tbody': {
          '> tr': {
            '&:first-of-type td': {
              border: 'none'
            },
            '> td': {
              py: 2,
              px: 1,
              borderTop: '1px solid #eee',
              color: '#888'
            }
          }
        }
      }
    })}
  >
    {p.children}
  </div>
)
Panel.Body = Body

export default Panel
