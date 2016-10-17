import React, { Component, PropTypes } from 'react'

export default class Code extends Component {
  static propTypes = {
    content: PropTypes.string
  }

  static defaultProps = {
    content: 'aaaaa'
  }

  render = () => {
    return (
      <div>
        <h2>content</h2>
        <pre><code>{this.props.content}</code></pre>
      </div>
    )
  }
}
