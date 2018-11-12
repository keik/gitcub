// @flow

import * as React from 'react'
import styled from 'react-emotion'

export default (styled.button`
  display: inline-block;
  color: ${({ primary }) => (primary ? '#fff' : '#333')};
  background-color: ${({ transparent }) => (transparent ? 'transparent' : '')};
  background-image: ${({ primary, transparent }) =>
    primary
      ? 'linear-gradient(#8add6d, #60b044)'
      : transparent
        ? 'none'
        : 'linear-gradient(#fcfcfc, #eee)'};
  position: relative;
  display: inline-block;
  padding: ${({ small }) => (small ? '3px 10px' : '6px 12px')};
  border: ${({ primary }) =>
    primary ? '1px solid #5aad35' : '1px solid #d5d5d5'};
  border-radius: 3px;
  font-size: ${({ small }) => (small ? '12px' : '14px')};
  font-weight: bold;
  line-height: 20px;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;

  &:hover {
    text-decoration: none;
  }
`: React.ComponentType<{ primary?: true, small?: true, transparent?: true }>)
