import React, { Component } from 'react'
import { connect } from 'react-redux'

import Footer from '../components/footer'
import Header from '../components/header'

import '../styles/global.css'

class AppContainer extends Component {

  static fetchData = () => {
    return new Promise((resolve, reject) => {
      console.log('aaaa')
      resolve('aaa')
    })
  }

  render = () => {
    console.log(this.props)
    const { children } = this.props
    return (
      <div>
        <Header />
        {children}
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => (state)

export default connect(mapStateToProps)(AppContainer)
