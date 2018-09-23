// @flow

import React from 'react'
import styled from 'styled-components'

import btnStyles from '../styles/btn.css'
import formStyles from '../styles/form.css'
import panelStyles from '../styles/panel.css'

export default function Login() {
  return (
    <$Container>
      <h1>Sign in to GH</h1>
      <form action="/session" className={panelStyles.panel} method="post">
        <div className={panelStyles.panelBody}>
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
          <button className={btnStyles.primaryBtn}>Sign in</button>
        </div>
      </form>
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
