// @flow

import * as React from 'react'
import styled from 'react-emotion'

import Logo from './common/atoms/Logo'
import InnerContainer from './common/layouts/InnerContainer'
import HeaderWithSession from './Header--with-session'
import HeaderWithoutSession from './Header--without-session'

export const App = ({
  children,
  session
}: {
  children: React.Node,
  session?: any
}) => (
  <div>
    <Header session={session} />
    {children}
    <Footer />
  </div>
)

export default App

export const Header = ({ session }: { session: any }) =>
  session != null ? (
    <HeaderWithSession session={session} />
  ) : (
    <HeaderWithoutSession />
  )

export const Footer = styled(({ className }) => (
  <InnerContainer>
    <div className={className}>
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
))`
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
`