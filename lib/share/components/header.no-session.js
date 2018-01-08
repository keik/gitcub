// @flow

import React from 'react'

import btnStyles from '../styles/btn.css'
import styles from './header.no-session.css'

export default function HeaderWithoutSession() {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.headerLogo}>
          <a className={styles.logo} href="/">
            GH
          </a>
        </div>
        <form className={styles.headerForm}>
          <label htmlFor="input-search-query">This repository</label>
          <input id="input-search-query" type="text" placeholder="Search" />
        </form>
        <div className={styles.headerNavRight}>
          <a className={btnStyles.defaultSmBtn} href="/login">
            Sign in
          </a>
          <a className={btnStyles.primarySmBtn} href="/join">
            Sign up
          </a>
        </div>
      </div>
    </div>
  )
}
