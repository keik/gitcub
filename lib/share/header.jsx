import React from 'react'

export default class Header extends React.Component {
  constructor () {
    super()
    this.style = {
      container: {
        border: '1px solid #cccccc'
      }
    }
  }

  render () {
    return (
      <div style={this.style.container}>
        <a href="#">logo</a>
        <form>
          <label>This repository</label>
          <input type="text" />
        </form>
        <nav>
          <ul>
            <li><a href="#">Pull requests</a></li>
            <li><a href="#">Issues</a></li>
          </ul>
        </nav>
        <nav>
          <ul>
            <li><a href="#">Cotifications</a></li>
            <li><a href="#">New</a></li>
            <li><a href="#">Usder</a></li>
          </ul>
        </nav>
      </div>
    )
  }
}
