// @flow

import React from 'react'
import styled from 'styled-components'

import Button from './common/atoms/Button'
import Panel from './common/blocks/Panel'
import formStyles from '../styles/form.css'

export default function Login() {
  return (
    <$Container>
      <h1>Sign in to GH</h1>
      <Panel>
        <Panel.Body>
          <form action="/session" method="post">
            <div className={formStyles.formGroup}>
              <label htmlFor="login">Username or email address</label>
              <input
                className={formStyles.formControl}
                id="login"
                name="login"
                type="text"
              />
            </div>
            <div className={formStyles.formGroup}>
              <label htmlFor="id">Password</label>
              <input
                className={formStyles.formControl}
                id="password"
                name="password"
                type="text"
              />
            </div>
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
