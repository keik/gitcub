import React from 'react'

export default class FileContent extends React.Component {
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

FileContent.propTypes = {
  content: React.PropTypes.string
}

FileContent.defaultProps = {
  content: 'this is file content'
}
