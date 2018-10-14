// @flow

import React from 'react'
import styled from 'styled-components'

import Logo from './common/atoms/Logo'
import InnerContainer from './common/layouts/InnerContainer'

const Footer = () => (
  <$Container>
    <$NavLinks>
      <li>&copy; 2016 keik</li>
      <li>
        <a href="#">Help</a>
      </li>
    </$NavLinks>
    <Logo href="#">GH</Logo>
    <$NavLinks>
      <li>
        <a href="#">API</a>
      </li>
      <li>
        <a href="#">About</a>
      </li>
    </$NavLinks>
  </$Container>
)

export default Footer

const $Container = styled(InnerContainer)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 0;
  margin-top: 36px;
  border-top: 1px solid #eee;
  color: #767676;
  font-size: 12px;
`
const $NavLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    display: inline-block;
    + li {
      margin-left: 10px;
    }
  }
`
