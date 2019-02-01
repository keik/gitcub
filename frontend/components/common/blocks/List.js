// @flow

import * as React from 'react'
import { jsx, css } from '@emotion/core'
import * as React from 'react'

const List = (p: {
  children: React.ChildrenArray<React.Element<'li'>>,
  lined?: true,
  withLRPadding?: true
}) => (
  <ul
    css={css`
      margin: 0;
      padding: 0;
      list-style: none;
      li {
        padding: ${p.withLRPadding ? '12px 12px' : '12px 0'};
        + li {
          ${p.lined ? 'border-top: 1px solid #f1f1f1' : ''};
        }
      }
    `}
  >
    {p.children}
  </ul>
)

export default List
