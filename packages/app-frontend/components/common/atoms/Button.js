// @flow

import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Button = (p: {
  as?: 'a' | 'button' | 'input' | typeof Link,
  children?: React.Node,
  primary?: true,
  small?: true,
  transparent?: true
}) => {
  const Elem = styled(p.as || 'button')`
    display: inline-block;
    color: ${p.primary ? '#fff' : '#333'};
    background-color: ${p.transparent ? 'transparent' : ''};
    background-image: ${p.primary
      ? 'linear-gradient(#8add6d, #60b044)'
      : p.transparent
      ? 'none'
      : 'linear-gradient(#fcfcfc, #eee)'};
    position: relative;
    padding: ${p.small ? '3px 10px' : '6px 12px'};
    border: ${p.primary ? '1px solid #5aad35' : '1px solid #d5d5d5'};
    border-radius: 3px;
    font-size: ${p.small ? '12px' : '14px'};
    font-weight: bold;
    line-height: 20px;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;

    &:hover {
      text-decoration: none;
    }
  `
  return <Elem {...p}>{p.children}</Elem>
}

export default Button
