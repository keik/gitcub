import React from 'react'

export default class RepositoryHeader extends React.Component {
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
        <h1><a href={`/${this.props.user}`}>{this.props.user}</a> / <a href={`/${this.props.user}/${this.props.repo}`}>{this.props.repo}</a></h1>
        <nav>
          <ul>
            <li><form><button>Watch {this.props.watchedCount}</button></form></li>
            <li><form><button>Star {this.props.staredCount}</button></form></li>
            <li><form><button>Fork {this.props.forkedCount}</button></form></li>
          </ul>
        </nav>
      </div>
    )
  }
}

RepositoryHeader.propTypes = {
  user: React.PropTypes.string.isRequired,
  repo: React.PropTypes.string.isRequired,
  watchedCount: React.PropTypes.number.isRequired,
  staredCount: React.PropTypes.number.isRequired,
  forkedCount: React.PropTypes.number.isRequired
}
