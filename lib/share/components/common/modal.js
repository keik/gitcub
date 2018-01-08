// @flow

import PropTypes from 'prop-types'
import * as React from 'react'

const styles = {
  container: {
    position: 'absolute'
  },
  modal: {
    backgroundClip: 'padding-box',
    backgroundColor: '#fff',
    border: '1px solid rgba(200, 200, 200, 0.4)',
    borderRadius: '3px',
    boxShadow: '0 3px 12px rgba(0,0,0,0.15)',
    position: 'absolute',
    width: '100%',
    zIndex: 100
  },
  backdrop: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1
  }
}

export default class Modal extends React.Component<
  {
    children: React.Node,
    width?: any
  },
  {
    active: boolean
  }
> {
  _container: ?HTMLElement

  static propTypes = {
    width: PropTypes.any,
    children: PropTypes.any
  }

  state = { active: false }

  open = () => {
    this.setState({ active: true })
  }

  close = () => {
    this.setState({ active: false })
  }

  render() {
    const { active } = this.state
    const { width } = this.props
    return (
      <div
        className="modal"
        ref={c => (this._container = c)}
        style={{
          display: active ? 'block' : 'none',
          ...styles.container,
          width
        }}
      >
        <div style={Object.assign({}, styles.modal)}>{this.props.children}</div>
        <div style={styles.backdrop} onClick={this.close} />
      </div>
    )
  }
}
