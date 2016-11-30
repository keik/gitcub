import debug                           from 'debug'
import React, { Component, PropTypes } from 'react'

import HeaderWithSession from './header.session.js'
import HeaderWithoutSession from './header.no-session.js'

const d = debug('keik:gh:components:header')

export default class Header extends Component {
  static propTypes = {
  }

  render = () => {
    d('render')
    const { session } = this.props
    return (
      session != null ?
        <HeaderWithSession {...this.props} /> :
        <HeaderWithoutSession {...this.props} />
    )
  }
}
