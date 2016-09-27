import React from 'react'

export default class FileContent extends React.Component {
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

FileContent.propTypes = {
  content: React.PropTypes.string
}

FileContent.defaultProps = {
  content: 'this is file content'
}
