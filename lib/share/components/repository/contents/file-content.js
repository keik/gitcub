import React, { Component, PropTypes } from 'react'

export default class FileContent extends Component {
  static propTypes = {
    content: PropTypes.string
  }

  static defaultProps = {
    content: 'this is file content'
  }

  render = () => {
    return (
      <div>
        <div>
          commit tease
        </div>
        <div>
          file
          <div>
            file header
          </div>
          <div>
            <pre><code>{this.props.content}</code></pre>
          </div>
        </div>
      </div>
    )
  }
}
