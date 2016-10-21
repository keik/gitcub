import React, { Component } from 'react'
import { Link } from 'react-router'

export default class App extends Component {
  render = () => {
    return (
      <div>
        <Link to="/user1/repo1">/user1/repo1</Link>
      </div>
    )
  }
}
