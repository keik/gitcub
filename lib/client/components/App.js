// @flow

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import * as React from 'react'
import { connect } from 'react-redux'

import Logo from './common/atoms/Logo'
import InnerContainer from './common/layouts/InnerContainer'
import HeaderWithSession from './App__Header--with-session'
import HeaderWithoutSession from './App__Header--without-session'
import type { ReducersStateT } from '../ducks'
import * as SessionAction from '../ducks/session'

export const $App = ({
  children,
  session
}: {
  children: React.Node,
  session?: {} // TODO: wrong type. cannot infer and raise error?
}) => (
  <div>
    <Header session={session} />
    {children}
    <Footer />
  </div>
)

export default connect<_, _, *, _, *, _>(({ session }: ReducersStateT) => ({
  session
}))(
  class App extends React.Component<*, { isLoading: boolean }> {
    state = { isLoading: false }

    async componentDidMount() {
      const { dispatch } = this.props
      this.setState({ isLoading: true })
      dispatch(await SessionAction.getCurrentUser())
      this.setState({ isLoading: false })
    }

    render() {
      return this.state.isLoading ? (
        <div>Loading...</div>
      ) : (
        <$App {...this.props} />
      )
    }
  }
)

export const Header = ({ session }: { session: any }) =>
  session == null ? (
    <HeaderWithoutSession />
  ) : (
    <HeaderWithSession session={{}} />
  )

export const Footer = () => (
  <InnerContainer>
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 24px 0;
        margin-top: 36px;
        border-top: 1px solid #eee;
        color: #767676;
        font-size: 12px;
        > ul {
          list-style: none;
          padding: 0;
          margin: 0;
          > li {
            display: inline-block;
            + li {
              margin-left: 10px;
            }
          }
        }
      `}
    >
      <ul>
        <li>&copy; 2016 keik</li>
        <li>
          <a href="#">Help</a>
        </li>
      </ul>
      <Logo href="#">GH</Logo>
      <ul>
        <li>
          <a href="#">API</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
      </ul>
    </div>
  </InnerContainer>
)
