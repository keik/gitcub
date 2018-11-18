// @flow

import * as React from 'react'

export default class Dropdown extends React.Component<
  {
    children: React.Element<*>,
    toggler: React.Element<*>,
    width: number
  },
  {
    isOpen: boolean
  }
> {
  static defaultProps = {
    width: 180
  }

  state = {
    isOpen: false
  }

  render() {
    const { toggler, children } = this.props
    const { isOpen } = this.state

    return (
      <span {...this.props}>
        {React.cloneElement(toggler, {
          onClick: () => this.setState({ isOpen: true })
        })}
        {isOpen && (
          <div
            css={`
              position: absolute;
              margin-top: 4px;
              z-index: 100;
              border: 1px solid rgba(200, 200, 200, 0.4);
              border-radius: 3px;
              box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 12px;
              min-width: ${this.props.width}px;

              > * {
                z-index: 101;
                position: relative;
              }

              &:before {
                position: fixed;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                background-color: transparent;
                content: '';
                z-index: 100;
              }
            `}
            onClick={e => {
              if (e.target === e.currentTarget) this.setState({ isOpen: false })
            }}
          >
            {children}
          </div>
        )}
      </span>
    )
  }
}
