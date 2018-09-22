// @flow

import React from 'react'
import styled from 'styled-components'

import ButtonsContainer from './common/layouts/ButtonsContainer'
import InnerContainer from './common/layouts/InnerContainer'
import Button from './common/atoms/Button'
import Logo from './common/atoms/Logo'

export default function HeaderWithoutSession() {
  return (
    <$Container>
      <div>
        <Logo href="/">GH</Logo>
      </div>
      <$HeaderForm>
        <label htmlFor="input-search-query">This repository</label>
        <input id="input-search-query" type="text" placeholder="Search" />
      </$HeaderForm>
      <ButtonsContainer>
        <Button as="a" small href="/login">
          Sign in
        </Button>
        <Button as="a" primary small href="/join">
          Sign up
        </Button>
      </ButtonsContainer>
    </$Container>
  )
}

const $Container = styled(InnerContainer)`
  display: flex;
  justify-content: space-between;
  > *:last-child {
    margin-left: auto;
  }
  padding: 10px 0;
  background-color: #fff;
  border-bottom: 1px solid #e5e5e5;
  font-size: 13px;

  &:after {
    content: '';
    display: table;
    clear: both;
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
