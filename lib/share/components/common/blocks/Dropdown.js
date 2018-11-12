// @flow

import * as React from 'react'
import styled from 'react-emotion'

export default class Dropdown extends React.Component<
  {
    children: React.Element<'ul'>,
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
      <$StyledDropdown {...this.props}>
        {React.cloneElement(toggler, {
          onClick: () => this.setState({ isOpen: true })
        })}
        {isOpen && (
          <div
            onClick={e => {
              if (e.target === e.currentTarget) this.setState({ isOpen: false })
            }}
          >
            {children}
          </div>
        )}
      </$StyledDropdown>
    )
  }
}

const $StyledDropdown = styled.span`
  > div {
    position: absolute;

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

    > ul {
      position: relative;
      display: flex;
      flex-direction: column;
      min-width: ${props => `${props.width}px`};
      padding: 8px 0;
      margin: 0;
      list-style: none;
      font-weight: bold;
      background-color: #fff;
      border: 1px solid rgba(200, 200, 200, 0.4);
      border-radius: 3px;
      box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
      z-index: 101;

      > li {
        &.Dropdown__divider {
          margin: 8px 0;
          border-top: 1px solid #e5e5e5;
        }
        > * {
          display: block;
          padding: 4px 12px;
        }
        > a {
          &:hover {
            color: #fff;
            background-color: #4078c0;
          }
        }
      }
    }
  }
`
