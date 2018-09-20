// @flow

import React from 'react'
import styled from 'styled-components'

import InnerContainer from './common/layouts/InnerContainer'
import Button from './common/atoms/Button'

export default function HeaderWithoutSession() {
  return (
    <$Container>
      <InnerContainer>
        <div style={{ float: 'left' }}>
          <$Logo href="/">GH</$Logo>
        </div>
        <$HeaderForm>
          <label htmlFor="input-search-query">This repository</label>
          <input id="input-search-query" type="text" placeholder="Search" />
        </$HeaderForm>
        <div style={{ float: 'right' }}>
          <Button small href="/login">
            Sign in
          </Button>
          <Button primary small href="/join">
            Sign up
          </Button>
        </div>
      </InnerContainer>
    </$Container>
  )
}

const $Container = styled.div`
  padding: 10px 0;
  background-color: #fff;
  border-bottom: 1px solid #e5e5e5;
  font-size: 13px;

  &:after {
    content: '';
    display: table;
    clear: both;
  }
  a {
    color: #333;
    &:hover {
      text-decoration: none;
      color: #4078c0;
    }
  }
`

const $Logo = styled.a`
  padding: 0 8px;
  margin-right: 12px;
  line-height: 28px;
  vertical-align: middle;
  color: #ccc;
  font-size: 22px;
  font-family: 'Rajdhani', sans-serif;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-decoration: none;
  &:hover {
    border-color: #4078c0;
  }
`

const $HeaderForm = styled.form`
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
`
