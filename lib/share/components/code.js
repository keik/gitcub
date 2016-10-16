import React from 'react'

export default class Code extends React.Component {
  constructor () {
    super()
  }

  render () {
    return (
      <div>
        <h2>content</h2>
        <pre><code>{this.props.content}</code></pre>
      </div>
    )
  }
}

Code.propTypes = {
  content: React.PropTypes.string
}

Code.defaultProps = {
  content: 'aaaaa'
}
