import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import styles from './header.css'

export default class Header extends Component {
  static propTypes = {
    loginUser: PropTypes.string.isRequired,
  }

  static defaultProps = {
    loginUser: 'DUMMY_USER',
  }

  render = () => {
    const { loginUser } = this.props
    return (
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.headerLogo}>
            <a href="#">logo</a>
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
                <Link to="/pulls">Pull requests</Link>
              </li>
              <li>
                <Link to="/issues">Issues</Link>
              </li>
            </ul>
          </nav>
          <nav className={styles.headerNavRight}>
            <ul className={styles.otherClassName}>
              <li>
                <Link to="/notifications">Notifications</Link>
              </li>
              <li>
                <Link to="/new">New</Link>
              </li>
              <li>
                <Link to={`/${loginUser}`}>Sign in as {loginUser}</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}
