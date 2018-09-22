// @flow

import React from 'react'

import styles from './login.css'
import btnStyles from '../styles/btn.css'
import formStyles from '../styles/form.css'
import panelStyles from '../styles/panel.css'

export default function Login() {
  return (
    <div className={styles.container}>
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
    </div>
  )
}
