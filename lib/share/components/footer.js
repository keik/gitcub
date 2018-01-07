import debug from 'debug'
import React from 'react'

import styles from './footer.css'

const d = debug('keik:gh:components:footer')

export default class Footer extends React.Component {
  render() {
    d('render')
    return (
      <div className={styles.container}>
        <div className="container">
          <ul className={styles.leftLinks}>
            <li>&copy; 2016 keik</li>
            <li>
              <a href="#">Help</a>
            </li>
          </ul>
          <a className={styles.logo} href="#">
            GH
          </a>
          <ul className={styles.rightLinks}>
            <li>
              <a href="#">API</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
