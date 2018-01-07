import React, { Component, PropTypes } from 'react'

const styles = {
  tabItems: {
    container: {
      padding: '8px 8px 0',
      margin: 0,
      listStyle: 'none',
      borderBottom: '1px solid #ddd'
    }
  },
  tabItem: {
    container: {
      float: 'left',
      marginBottom: '-1px'
    },
    container_active: {
      backgroundColor: '#fff',
      borderLeft: '1px solid #ddd',
      borderTop: '1px solid #ddd',
      borderTopLeftRadius: 3,
      borderTopRightRadius: 3,
      borderRight: '1px solid #ddd'
    },
    a: {
      display: 'block',
      color: '#888',
      fontSize: '11px',
      fontWeight: 'bold',
      padding: '4px 8px 2px',
      textDecoration: 'none'
    },
    a_active: {
      color: '#333'
    }
  },
  tabPanel: {
    container: {
      display: 'none'
    },
    active: {
      display: 'block'
    }
  },
  clearfix: {
    clear: 'both',
    display: 'table'
  }
}

export class Tab extends Component {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired
  }

  constructor() {
    super()
    this.state = {
      _active: ''
    }
  }

  activate = (e, target) => {
    if (e) e.preventDefault()
    this.setState({ _active: target })
  }

  render() {
    const { activate } = this
    const { _active } = this.state
    const { children, style } = this.props
    return (
      <div style={style}>
        {React.Children.map(children, c =>
          React.cloneElement(c, { activate, _active })
        )}
      </div>
    )
  }
}

export class TabItems extends Component {
  render() {
    const { _active, activate, children } = this.props
    return (
      <ul style={styles.tabItems.container}>
        {React.Children.map(children, c =>
          React.cloneElement(c, { activate, _active })
        )}
        <div style={styles.clearfix} />
      </ul>
    )
  }
}

export class TabItem extends Component {
  componentWillMount(props) {
    if (this.props.active) this.props.activate(null, this.props.target)
  }

  render() {
    const { _active, activate, target } = this.props
    return (
      <li
        style={Object.assign(
          {},
          styles.tabItem.container,
          _active === target ? styles.tabItem.container_active : {}
        )}
      >
        <a
          href="#"
          onClick={e => activate(e, target)}
          style={Object.assign(
            {},
            styles.tabItem.a,
            _active === target ? styles.tabItem.a_active : {}
          )}
        >
          {this.props.children}
        </a>
      </li>
    )
  }
}

export class TabPanel extends Component {
  render() {
    const { _active, name } = this.props
    return (
      <div
        style={Object.assign(
          {},
          styles.tabPanel.container,
          _active === name ? styles.tabPanel.active : {}
        )}
      >
        {this.props.children}
      </div>
    )
  }
}
