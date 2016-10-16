import React from 'react'

import styles from './header.css'

export default class Header extends React.Component {
  constructor () {
    super()
  }

  render () {
    return (
      <div className={styles.container}>
        <div className="container">
          <div className={styles.headerLogo}>
            <a href="#">logo</a>
          </div>
          <form className={styles.headerForm}>
            <label htmlFor="input-search-query">This repository</label>
            <input id="input-search-query" type="text" placeholder="Search" />
          </form>
          <nav className={styles.headerNavLeft}>
            <ul>
              <li><a href="#">Pull requests</a></li>
              <li><a href="#">Issues</a></li>
            </ul>
          </nav>
          <nav className={styles.headerNavRight}>
            <ul className={styles.otherClassName}>
              <li><a href="#">Notifications</a></li>
              <li><a href="#">New</a></li>
              <li><a href="#">User</a></li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}