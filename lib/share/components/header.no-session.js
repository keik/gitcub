import debug                           from 'debug'
import React, { Component, PropTypes } from 'react'

import styles         from './header.css'

const d = debug('keik:gh:components:header.no-session')

export default class HeaderWithoutSession extends Component {
  static propTypes = {
  }

  render = () => {
    d('render')
    return (
      <div className={styles.container}>
        TODO
      </div>
    )
  }
}
