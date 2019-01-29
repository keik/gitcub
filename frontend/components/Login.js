// @flow

import React from 'react'
import styled from '@emotion/styled'

import Button from './common/atoms/Button'
import FormGroup from './common/blocks/FormGroup'
import Panel from './common/blocks/Panel'

export default function Login() {
  return (
    <$Container>
      <h1>Sign in to GH</h1>
      <Panel>
        <Panel.Body>
          <form action="/session" method="post">
            <FormGroup>
              <label htmlFor="login">Username or email address</label>
              <input id="login" name="login" type="text" />
            </FormGroup>
            <FormGroup>
              <label htmlFor="id">Password</label>
              <input id="password" name="password" type="text" />
            </FormGroup>
            <Button primary>Sign in</Button>
          </form>
        </Panel.Body>
      </Panel>
    </$Container>
  )
}

const $Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 300px;

  > form {
    background-color: #fff;
  }
  h1 {
    text-align: center;
  }
`
