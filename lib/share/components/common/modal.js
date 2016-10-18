import React, { Component } from 'react'

const styles = {
  container: {
    position: 'absolute',
  },
  modal: {
    position: 'absolute',
    border: '1px solid rgba(200, 200, 200, 0.4)',
    borderRadius: '3px',
    boxShadow: '0 3px 12px rgba(0,0,0,0.15)',
    backgroundColor: '#fff',
    zIndex: 100,
  },
  backdrop: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1,
  }
}

export default class Modal extends Component {
  constructor(props) {
    super()
    this.state = Object.assign({}, props)
  }

  open = () => {
    this.setState({active: true})
  }

  close = () => {
    this.setState({active: false})
  }

  render = () => {
    const { active } = this.state
    return (
      <div
        ref={c => this._container = c}
        style={{display: active ? 'block' : 'none', ...styles.container}}
      >
        <div style={styles.modal}
        >
          {this.props.children}
        </div>
        <div
          style={styles.backdrop}
          onClick={this.close}
        />
      </div>
    )
  }
}