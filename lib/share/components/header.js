import debug from 'debug'
import React, { Component, PropTypes } from 'react'

import styles from './header.css'

const d = debug('keik:gh:components:header')

export default class Header extends Component {
  static propTypes = {
    loginUser: PropTypes.string.isRequired,
  }

  static defaultProps = {
    loginUser: 'DUMMY_USER',
  }

  render = () => {
    d('render')
    const { loginUser } = this.props
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
          <nav className={styles.headerNavLeft}>
            <ul>
              <li>
                <a to="#">Pull requests</a>
              </li>
              <li>
                <a to="#">Issues</a>
              </li>
            </ul>
          </nav>
          <nav className={styles.headerNavRight}>
            <ul className={styles.otherClassName}>
              <li>
                <a href="#"><i className="fa fa-bell" /></a>
              </li>
              <li>
                <a href="#"><i className="fa fa-plus" /></a>
              </li>
              <li>
                <a href={`/${loginUser}`}>
                  <img alt="avator" style={{float: 'right', width: 20, height: 20, backgroundColor: '#ccc'}}/>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}
