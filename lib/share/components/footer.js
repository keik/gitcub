import React, { Component, PropTypes } from 'react'

import styles from './footer.css'

export default class Footer extends Component {
  static propTypes = {
    user: PropTypes.string.isRequired,
  }

  render = () => {
    return (
      <div
        className={styles.container}>
        <div className="container">
          <ul
            className={styles.leftLinks}
          >
            <li>&copy; 2016 keik</li>
            <li><a href="#">Help</a></li>
          </ul>
          <a href="#">LOGO</a>
          <ul
            className={styles.rightLinks}
          >
            <li><a href="#">API</a></li>
            <li><a href="#">About</a></li>
          </ul>
        </div>
      </div>
    )
  }
}
