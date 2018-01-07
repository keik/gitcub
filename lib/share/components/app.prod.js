import debug                from 'debug'
import React, { Component } from 'react'

import Footer from '../components/footer'
import Header from '../components/header'

import '../styles/global.css'

const d = debug('keik:gh:components:app')

export default class App extends Component {
  render() {
    d('render')
    const { children } = this.props
    return (
      <div>
        <Header {...this.props} />
        {children}
        <Footer />
      </div>
    )
  }
}
