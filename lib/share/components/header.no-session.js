import debug                           from 'debug'
import React, { Component, PropTypes } from 'react'

import btnStyles from '../styles/btn.css'
import styles    from './header.no-session.css'

const d = debug('keik:gh:components:header.no-session')

export default class HeaderWithoutSession extends Component {
  static propTypes = {
  }

  render = () => {
    d('render')
    return (
      <div className={styles.container}>
        <link href="https://fonts.googleapis.com/css?family=Rajdhani" rel="stylesheet" />
        <div className={styles.innerContainer}>
          <div className={styles.headerLogo}>
            <a className={styles.logo}
              href="/"
            >
              GH
            </a>
          </div>
          <form className={styles.headerForm}>
            <label htmlFor="input-search-query">
              This repository
            </label>
            <input
              id="input-search-query"
              type="text"
              placeholder="Search"
            />
          </form>
          <div className={styles.headerNavRight}>
            <a
              className={btnStyles.defaultSmBtn}
              href="/login"
            >
              Sign in
            </a>
            <a
              className={btnStyles.primarySmBtn}
              href="/join"
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    )
  }
}
