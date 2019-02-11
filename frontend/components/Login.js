// @flow

import * as React from 'react'

import Button from './common/atoms/Button'
import FormGroup from './common/blocks/FormGroup'
import Panel from './common/blocks/Panel'

const Login = () => (
  <div
    css={`
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
    `}
  >
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
  </div>
)

export default Login