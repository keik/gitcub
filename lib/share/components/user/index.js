import debug from 'debug'
import React, { Component, PropTypes } from 'react'

import styles from './index.css'

const d = debug('keik:gh:components:user')

export default class UserApp extends Component {

  render = () => {
    d('render')
    return (
      <div className={styles.container}>
        USER_PAGE
      </div>
    )
  }
}
